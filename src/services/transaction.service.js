const accountService = require('./account.service');
const { BizError } = require('../common/errors');
const { ResultCode, RabbitMQConstants } = require('../common/constants');
const { sendMessage } = require('../config/rabbitmq');
const { Transaction, Account} = require('../models');
const { AccountTypeEnum, TransactionTypeEnum } = require('../common/enums');
const TransactionStatusEnum = require("../common/enums/transaction-status.enum");
const request = require('../utils/request');
const logger = require('../config/logger');

const getTransactionById = async (transactionId) => {
  const transaction = await Transaction.findById(transactionId);

  if (!transaction) {
    throw new BizError(ResultCode.TRANSACTION_NOT_FOUND);
  }

  return transaction;
};

const createTransaction = async (transactionForm) => {
  let transaction = await convertFormToTransaction(transactionForm);

  // Create a new transaction
  transaction = await Transaction.create(transaction);

  if (transaction) {
    // Send transaction to rabbitmq for async processing
    const message = JSON.stringify({
      transactionId: transaction.id,
      type: transaction.type,
    });
    await sendMessage(RabbitMQConstants.TRANSACTION_QUEUE, message);
  }
};

const convertFormToTransaction = async (transactionForm) => {
  const { orderId, amount, accountId, type } = transactionForm;

  // Get account binding to user
  const userAccount = await accountService.getAccountById(accountId);

  // Get merchant account id
  const merchantAccountId = await accountService.getAccountIdByType(
    AccountTypeEnum.MERCHANT,
  );

  let fromAccountId, toAccountId;

  switch (transactionForm.type) {
    case TransactionTypeEnum.PAYMENT:
    case TransactionTypeEnum.WITHDRAW:
      fromAccountId = userAccount.id;
      toAccountId = merchantAccountId;
      break;
    case TransactionTypeEnum.DEPOSIT:
    case TransactionTypeEnum.REFUND:
      fromAccountId = merchantAccountId;
      toAccountId = userAccount.id;
      break;
  }

  return {
    fromAccountId,
    toAccountId,
    amount,
    type,
    orderId,
  };
};

const processTransaction = async (transactionId) => {
  const transaction = await getTransactionById(transactionId);

  try {
    switch (transaction.type) {
      case TransactionTypeEnum.DEPOSIT:
        await processDeposit(transaction);
        break;
      case TransactionTypeEnum.WITHDRAW:
        await processWithdraw(transaction);
        break;
      case TransactionTypeEnum.PAYMENT:
        await processPayment(transaction);
        break;
      case TransactionTypeEnum.REFUND:
        await processRefund(transaction);
        break;
      default:
        throw new BizError(ResultCode.TRANSACTION_TYPE_INVALID);
    }
  } catch (error) {
    // Update transaction status
    transaction.status = TransactionStatusEnum.FAILED;
    transaction.description = error.message;

    await transaction.save();

    throw error;
  }

  // Send transaction result to shipping service for order processing
  try {
    const result = {
      transactionId: transaction.id,
      orderId: transaction.orderId,
      status: transaction.status,
    }

    await request.post('api/payment/result', result);
  } catch (error) {
    logger.error(`Error sending transaction result to shopping service: ${error}`);
    throw new BizError(ResultCode.SERVER_ERROR);
  }
};

const processDeposit = async (transaction) => {
  const { toAccountId, amount } = transaction;

  const toAccount = await Account.findById(toAccountId);
  const systemAccount = await Account.findOne({ type: AccountTypeEnum.SYSTEM });

  if (!toAccount || !systemAccount) {
    throw new BizError(ResultCode.ACCOUNT_NOT_FOUND);
  }

  // Update account balance
  toAccount.balance += amount;
  systemAccount.balance += amount;

  await toAccount.save();
  await systemAccount.save();
};

const processWithdraw = async (transaction) => {
  const { fromAccountId, amount } = transaction;

  const fromAccount = await Account.findById(fromAccountId);
  const systemAccount = await Account.findOne({ type: AccountTypeEnum.SYSTEM });

  if (!fromAccount || !systemAccount) {
    throw new BizError(ResultCode.ACCOUNT_NOT_FOUND);
  }

  if (systemAccount.balance < amount) {
    throw new BizError(ResultCode.MERCHANT_BALANCE_INSUFFICIENT);
  }

  // Update account balance
  fromAccount.balance -= amount;
  systemAccount.balance -= amount;

  await fromAccount.save();
  await systemAccount.save();
};

const processPayment = async (transaction) => {
  const { fromAccountId, amount } = transaction;

  const fromAccount = await Account.findById(fromAccountId);
  const merchantAccount = await Account.findOne({ type: AccountTypeEnum.MERCHANT });

  if (!fromAccount || !merchantAccount) {
    throw new BizError(ResultCode.ACCOUNT_NOT_FOUND);
  }

  if (fromAccount.balance < amount) {
    throw new BizError(ResultCode.ACCOUNT_BALANCE_INSUFFICIENT);
  }

  // Update account balance
  fromAccount.balance -= amount;
  merchantAccount.balance += amount;

  await fromAccount.save();
  await merchantAccount.save();
};

const processRefund = async (transaction) => {
  // Only refund if payment is successful
  if (transaction.status !== TransactionStatusEnum.SUCCESS) {
    throw new BizError(ResultCode.REFUND_TRANSACTION_NOT_SUCCESS);
  }

  const { toAccountId, amount } = transaction;

  const toAccount = await Account.findById(toAccountId);
  const merchantAccount = await Account.findOne({ type: AccountTypeEnum.MERCHANT });

  if (!toAccount || !merchantAccount) {
    throw new BizError(ResultCode.ACCOUNT_NOT_FOUND);
  }

  if (merchantAccount.balance < amount) {
    throw new BizError(ResultCode.MERCHANT_BALANCE_INSUFFICIENT);
  }

  // Update account balance
  toAccount.balance += amount;
  merchantAccount.balance -= amount;

  await toAccount.save();
  await merchantAccount.save();

  // Update transaction status
  transaction.status = TransactionStatusEnum.REFUNDED;
  await transaction.save();
};

const updatePaymentStatus = async (transactionId, status) => {
  const transaction = await getTransactionById(transactionId);

  transaction.status = status;
  await transaction.save();
};

module.exports = {
  getTransactionById,
  createTransaction,
  updatePaymentStatus,
  processTransaction,
};

const { accountService } = require('../services');
const { AccountTypeEnum } = require('../common/enums');
const logger = require('../config/logger');
const {Account} = require("../models");

// Use for create merchant and system accounts
const initAccounts = async () => {
  try {
    const merchantAccount = await Account.findOne({
      type: AccountTypeEnum.MERCHANT,
    });

    if (!merchantAccount) {
      await accountService.createAccount({
        email: 'merchant@example.com',
        type: AccountTypeEnum.MERCHANT,
        balance: 0,
      });
      logger.info('Merchant account created');
    } else {
      logger.info('Merchant account existed');
    }

    const systemAccount = await Account.findOne({
      type: AccountTypeEnum.SYSTEM,
    });

    if (!systemAccount) {
      await accountService.createAccount({
        email: 'system@example.com',
        type: AccountTypeEnum.SYSTEM,
        balance: 0,
      });
      logger.info('System account created');
    } else {
      logger.info('System account existed');
    }

  } catch (error) {
    logger.error(`Error initializing accounts: ${error}`);
  }
};

module.exports = initAccounts;

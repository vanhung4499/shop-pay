const { Account } = require('../models');
const { BizError } = require('../common/errors');
const { ResultCode, RedisKeyConstants} = require('../common/constants');
const redisClient = require('../config/redis');

const getAccountByUserId = async (userId) => {
  const account = await Account.findOne({ userId });

  if (!account) {
    throw new BizError(ResultCode.ACCOUNT_NOT_FOUND);
  }

  return account;
};

const getAccountById = async (accountId) => {
  const account = await Account.findById(accountId);

  if (!account) {
    throw new BizError(ResultCode.ACCOUNT_NOT_FOUND);
  }

  return account;
}

const createAccount = async (accountForm) => {
  const { email } = accountForm;

  const existAccount = await Account.findOne({ email });

  if (existAccount) {
    throw new BizError(ResultCode.ACCOUNT_EXISTS);
  }

  const account = await Account.create(accountForm);

  return account.id;
};

// Only for get merchant and system account
const getAccountByType = async (type) => {
  const account = await Account.findOne({
    type: type,
  });

  if (!account) {
    throw new BizError(ResultCode.ACCOUNT_NOT_FOUND);
  }

  return account;
};

const getAccountIdByType = async (type) => {
  // Find from redis first
  const cacheKey = RedisKeyConstants.ACCOUNT_KEY_PREFIX + type;
  const accountId = await redisClient.get(cacheKey);

  if (accountId) {
    return accountId;
  }

  // Otherwise, find from MongoDB
  const account = await getAccountByType(type);

  return account.id;
};

const cacheAccountId = async (type) => {
  const account = await getAccountByType(type);

  const cacheKey = RedisKeyConstants.ACCOUNT_KEY_PREFIX + type;
  await redisClient.set(cacheKey, account.id);
};

const deleteAccountById = async (accountId) => {
  const account = await getAccountById(accountId);
  await account.deleteOne();
  return account;
};

module.exports = {
  getAccountByUserId,
  createAccount,
  getAccountIdByType,
  cacheAccountId,
  getAccountById,
  getAccountByType,
  deleteAccountById,
};

const Joi = require('joi');

const AccountForm = Joi.object().keys({
  email: Joi.string().email().required(),
  userId: Joi.string().required(),
});

const createAccount = {
  body: AccountForm,
};

const accountParams = Joi.object().keys({
  accountId: Joi.string().required(),
});

const deleteAccount = {
  params: accountParams,
}

module.exports = {
  createAccount,
  deleteAccount,
}
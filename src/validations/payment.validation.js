const Joi = require("joi");
const {TransactionTypeEnum} = require("../common/enums");

const transactionForm = Joi.object().keys({
  accountId: Joi.string().required(),
  amount: Joi.number().required(),
  type: Joi.string().required().valid(...Object.values(TransactionTypeEnum)),
  orderId: Joi.string(),
});

const createTransaction = {
  body: transactionForm,
};

module.exports = {
  createTransaction,
}
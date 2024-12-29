const Joi = require("joi");
const {TransactionTypeEnum} = require("../common/enums");

const transactionForm = Joi.object().keys({
  amount: Joi.number().required(),
  type: Joi.string().required().valid(...Object.values(TransactionTypeEnum)),
  orderId: Joi.string(),
  userId: Joi.string().required(),
});

const createTransaction = {
  body: transactionForm,
};

module.exports = {
  createTransaction,
}
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const validator = require('validator');
const {TransactionStatusEnum, TransactionTypeEnum} = require("../common/enums");

const TransactionSchema = mongoose.Schema(
  {
    fromAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    toAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      enum: Object.values(TransactionTypeEnum),
      required: true,
    },
    description: {
      type: String,
    },
    orderId: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(TransactionStatusEnum),
      default: TransactionStatusEnum.PENDING,
    },
  },
  { timestamps: true },
);

TransactionSchema.plugin(toJSON);
TransactionSchema.plugin(paginate);

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
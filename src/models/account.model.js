const mongoose = require('mongoose');
const { AccountTypeEnum } = require('../common/enums');
const { toJSON, paginate } = require('./plugins');
const validator = require('validator');

const AccountSchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    type: {
      type: String,
      enum: Object.values(AccountTypeEnum),
      required: true,
      default: AccountTypeEnum.CUSTOMER,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

AccountSchema.plugin(toJSON);
AccountSchema.plugin(paginate);

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;

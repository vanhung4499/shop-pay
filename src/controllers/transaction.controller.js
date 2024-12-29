const catchAsync = require("../utils/catch-async");
const {transactionService} = require("../services");
const result = require("../utils/result");

const createTransaction = catchAsync(async (req, res) => {
  await transactionService.createTransaction(req.body);
  res.send(result.success());
});

module.exports = {
  createTransaction,
}
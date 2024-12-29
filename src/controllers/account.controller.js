const catchAsync = require("../utils/catch-async");
const {accountService} = require("../services");
const result = require("../utils/result");

const createAccount = catchAsync(async (req, res) => {
  const accountId = await accountService.createAccount(req.body);
  res.send(result.success(accountId));
});

const deleteAccount = catchAsync(async (req, res) => {
  const { accountId } = req.params;
  await accountService.deleteAccountById(accountId);
  res.send(result.success());
});

module.exports = {
  createAccount,
  deleteAccount
}
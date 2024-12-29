const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {accountValidation} = require("../../validations");
const {accountController} = require("../../controllers");

const router = express.Router();

router.post('/', auth(), validate(accountValidation.createAccount), accountController.createAccount);
router.delete('/', auth(), validate(accountValidation.deleteAccount), accountController.deleteAccount);

module.exports = router;

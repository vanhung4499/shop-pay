const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {transactionController} = require("../../controllers");
const {paymentValidation} = require("../../validations");

const router = express.Router();

router.post('/', auth(), validate(paymentValidation.createTransaction), transactionController.createTransaction);

module.exports = router;

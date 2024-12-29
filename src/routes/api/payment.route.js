const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {paymentController} = require("../../controllers");
const {paymentValidation} = require("../../validations");

const router = express.Router();

router.post('/', auth(), validate(paymentValidation.createTransaction), paymentController.createTransaction);

module.exports = router;

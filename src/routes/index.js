const express = require('express');
const apiRoute = require('./api');
const paymentRoute = require('./payment.route');

const router = express.Router();

router.use('/api', apiRoute);
router.use('/payment', );

module.exports = router;

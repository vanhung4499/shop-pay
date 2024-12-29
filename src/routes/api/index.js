const express = require('express');

const paymentRoute = require('./payment.route');
const accountRoute = require('./account.route');

const router = express.Router();


// Account route
router.use('/accounts', accountRoute);

// Payment route
router.use('/payment', paymentRoute);


module.exports = router;

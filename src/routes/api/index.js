const express = require('express');

const transactionRoute = require('./transaction.route');
const accountRoute = require('./account.route');

const router = express.Router();


// Account route
router.use('/accounts', accountRoute);

// Payment route
router.use('/payment', transactionRoute);

module.exports = router;

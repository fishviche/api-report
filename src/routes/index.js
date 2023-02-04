const express = require('express');
const reportRoute = require('./report.routes');

const router = express.Router();

router.use('/report', reportRoute);

module.exports = router;
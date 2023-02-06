const express = require('express');
const reportRoute = require('./report.routes');
const categoryRoute = require('./category.routes');
const reporterRoute = require('./reporter.routes');
const locationRoute = require('./location.routes');

const router = express.Router();

router.use('/report', reportRoute);
router.use('/category', categoryRoute);
router.use('/reporter', reporterRoute);
router.use('/location', locationRoute);

module.exports = router;
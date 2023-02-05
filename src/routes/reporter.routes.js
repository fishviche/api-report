const { Router } = require('express');
const router = Router();
const { getReporter } = require('../controllers/reporter.controller');

router.get('/get-reporter', getReporter);
module.exports = router;
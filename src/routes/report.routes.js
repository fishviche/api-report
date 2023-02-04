const { Router } = require('express');
const router = Router();
const { getReports, saveReport } = require('../controllers/report.controller');

router.get('/get-report', getReports);
router.post('/save-report', saveReport)
module.exports = router
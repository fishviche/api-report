const { Router } = require('express');
const router = Router();
const { getExcel } = require('../controllers/excel.controller.js');

router.get('/get-report-excel', getExcel);
module.exports = router;
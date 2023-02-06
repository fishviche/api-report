const reportExcelCtr = {};
const excelService = require('../services/excel.service.js')

reportExcelCtr.getExcel = async (req, res, next) => {
  try {
    const { district_id } = req.query
    const data = await excelService.createReporte(district_id);
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
};

module.exports = reportExcelCtr;
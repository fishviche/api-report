const categoryCtr = {};
const categoryService = require('../services/category.service.js')

categoryCtr.getOneCategory = async (req, res, next) => {
  const id = req.params.id
  try {
    const data = await categoryService.getOneCategory(id);
    res.status(200).json({data})
  } catch (err) {
    next(err);
  }
};

categoryCtr.getCategories = async (req, res, next) => {
  
  try {
    const data = await categoryService.getCategories();
    res.status(200).json(data)
  } catch (err) {
    next(err);
  }
}

categoryCtr.saveCategory = async (req, res, next) => {
  try {
    const response = await categoryService.addCategory(req.body);
    res.status(200).json(response)
  } catch (err) {
    next(err);
  }
};
module.exports = categoryCtr;
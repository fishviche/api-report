const { Router } = require('express');
const router = Router();
const { saveCategory, getOneCategory , getCategories } = require('../controllers/category.controller');

router.post('/save-category', saveCategory);
router.get('/get-category', getCategories);
router.get('/get-one-category/:id', getOneCategory);
module.exports = router;
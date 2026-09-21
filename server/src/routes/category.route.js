const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');
const authenticate = require('../middleware/authenticate');

// Public route to get all categories
router.get('/', categoryController.getAllCategories);

// Category creation, update, deletion
router.post('/', categoryController.createCategory);
router.post('/admin', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;

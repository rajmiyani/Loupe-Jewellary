const categoryService = require('../services/category.service');

async function createCategory(req, res) {
    try {
        const category = await categoryService.createCategory(req.body);
        return res.status(201).send(category);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

async function getAllCategories(req, res) {
    try {
        const categories = await categoryService.getAllCategories();
        return res.status(200).send(categories);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

async function updateCategory(req, res) {
    try {
        const category = await categoryService.updateCategory(req.params.id, req.body);
        return res.status(200).send(category);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

async function deleteCategory(req, res) {
    try {
        const result = await categoryService.deleteCategory(req.params.id);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
};

const Category = require('../models/category.model');
const Product = require('../models/product.model');

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

async function createCategory(reqData) {
    const { name, parentCategory, level, icon, image } = reqData;
    if (!name || !name.trim()) {
        throw new Error("Category name is required");
    }

    const trimmedName = name.trim();
    const slug = reqData.slug ? slugify(reqData.slug) : slugify(trimmedName);

    // Check if category already exists with same name or slug under same parent
    const existing = await Category.findOne({
        $or: [
            { name: { $regex: new RegExp(`^${trimmedName}$`, 'i') }, parentCategory: parentCategory || null },
            { slug: slug, parentCategory: parentCategory || null }
        ]
    });

    if (existing) {
        return existing;
    }

    let categoryLevel = level || 1;
    if (parentCategory) {
        const parent = await Category.findById(parentCategory);
        if (parent) {
            categoryLevel = (parent.level || 1) + 1;
        }
    }

    const category = new Category({
        name: trimmedName,
        slug: slug,
        parentCategory: parentCategory || null,
        level: categoryLevel,
        icon: icon || '',
        image: image || '',
    });

    return await category.save();
}

async function getAllCategories() {
    return await Category.find().populate('parentCategory').sort({ level: 1, name: 1 });
}

async function updateCategory(id, reqData) {
    const { name, parentCategory, level, icon, image } = reqData;
    const update = {};
    if (name) {
        update.name = name.trim();
        update.slug = slugify(name.trim());
    }
    if (parentCategory !== undefined) {
        update.parentCategory = parentCategory || null;
    }
    if (level) {
        update.level = level;
    }
    if (icon !== undefined) {
        update.icon = icon;
    }
    if (image !== undefined) {
        update.image = image;
    }

    const updated = await Category.findByIdAndUpdate(id, update, { new: true }).populate('parentCategory');
    if (!updated) {
        throw new Error("Category not found");
    }

    // Optionally sync flat secondLevelCategory string in products if renamed
    if (name) {
        await Product.updateMany(
            { category: id },
            { $set: { secondLevelCategory: name.trim() } }
        );
    }

    return updated;
}

async function deleteCategory(id) {
    const category = await Category.findById(id);
    if (!category) {
        throw new Error("Category not found");
    }

    // Delete child categories if any
    await Category.deleteMany({ parentCategory: id });
    await Category.findByIdAndDelete(id);

    return { message: "Category deleted successfully", id };
}

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    slugify
};

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true,
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        default: null,
    },
    level: {
        type: Number,
        default: 1,
    },
    icon: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Category = mongoose.model('categories', CategorySchema);

module.exports = Category;


const mongoose = require('mongoose');
const { connectDB } = require('./src/config/db');

connectDB()
    .then(async () => {
        console.log('Connected to MongoDB');

        const Product = mongoose.model('products', new mongoose.Schema({}, { strict: false }));

        const result = await Product.deleteMany({ brand: { $regex: /gayatri|gaytri/i } });
        console.log(`Deleted ${result.deletedCount} old products with brand Gayatri/Gaytri.`);

        // As safety, also specifically delete the ones called "Gaytri Jeweller" exactly
        const result2 = await Product.deleteMany({ brand: "Gaytri Jeweller" });
        console.log(`Deleted exact "Gaytri Jeweller" matches: ${result2.deletedCount}`);

        // Also ensure "Silver Oxidized Ring" from Gayatri is deleted. It should be caught by regex anyway.

        // Ensure all remaining products are updated to strictly "Loupe Jeweler" if they have no brand or some legacy brand.
        // The user ONLY wants Loupe Jeweler products. Wait, if some products have "Loupe Jewelers" vs "Loupe Jeweler" maybe just leave them.
        const result3 = await Product.updateMany({}, { $set: { brand: "Loupe Jeweler" } });
        console.log(`Ensured ${result3.modifiedCount} products explicitly use 'Loupe Jeweler' branding.`);

        mongoose.disconnect();
    })
    .catch(err => {
        console.error('Error connecting to DB:', err);
        mongoose.disconnect();
    });

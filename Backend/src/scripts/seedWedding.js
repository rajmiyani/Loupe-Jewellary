/**
 * Seed Script: Insert WEDDING collection products into MongoDB.
 * Run: node src/scripts/seedWedding.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/category.model');
const Product = require('../models/product.model');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';

const WEDDING_PRODUCTS = [
    { title: 'Bridal Gold Necklace Set', description: 'Complete bridal necklace with matching earrings', details: '22KT gold with Polki and Kundan work, hand-crafted', occasion: 'bridal', type: 'gold', color: 'gold', price: 95000, discountedPrice: 85500, brand: 'Gayatri', quantity: 3, collectionName: 'wedding', sizes: [{ weight: '55g', size: 'Standard', stock: 3 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1707742460/45_eqespc.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'necklace' },
    { title: 'Bridal Diamond Bangles Set', description: 'Premium diamond-studded bangle set for brides', details: '18KT gold with full channel-set diamonds', occasion: 'bridal', type: 'diamond', color: 'gold', price: 250000, discountedPrice: 225000, brand: 'Gayatri', quantity: 2, collectionName: 'wedding', sizes: [{ weight: '30g', size: '2.6', stock: 2 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731879/fod-bangle_bsxfzl.webp' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'bangle' },
    { title: 'Bridal Mangalsutra Deluxe', description: 'Elaborate bridal mangalsutra with diamond pendant', details: '22KT gold with diamond pendant, 18 inch length', occasion: 'bridal', type: 'gold', color: 'gold', price: 65000, discountedPrice: 58500, brand: 'Gayatri', quantity: 4, collectionName: 'wedding', sizes: [{ weight: '12g', size: '18 inch', stock: 4 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731944/fod-mangalsutra_zb7tpy.webp' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'mangal-sutra' },
    { title: 'Wedding Jhumka Earrings Gold', description: 'Heavy gold jhumka set for wedding ceremony', details: '22KT gold with meenakari and precious stone work', occasion: 'bridal', type: 'gold', color: 'gold', price: 42000, discountedPrice: 37800, brand: 'Gayatri', quantity: 5, collectionName: 'wedding', sizes: [{ weight: '15g', size: 'Standard', stock: 5 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439069/1_hvyglx.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'jhumka' },
    { title: 'Wedding Couple Ring Set Gold', description: 'Elegant couple wedding rings in 22KT gold', details: '22KT gold pair with intricate hand-carved patterns', occasion: 'bridal', type: 'gold', color: 'gold', price: 55000, discountedPrice: 49500, brand: 'Gayatri', quantity: 6, collectionName: 'wedding', sizes: [{ weight: '9g', size: '16 & 19', stock: 6 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439067/3_xwvjdr.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'couple-ring' },
    { title: 'Bridal Bracelet Gold', description: 'Heavy gold bracelet for bridal occasion', details: '22KT gold with Kundan stones and floral design', occasion: 'bridal', type: 'gold', color: 'gold', price: 38000, discountedPrice: 34200, brand: 'Gayatri', quantity: 5, collectionName: 'wedding', sizes: [{ weight: '18g', size: '7 inch', stock: 5 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731943/fod-bracelet_um6zoo.webp' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'bracelet' },
    { title: 'Wedding Gold Chain', description: 'Thick gold chain for wedding wear', details: '22KT gold heavy link chain, 22 inch length', occasion: 'bridal', type: 'gold', color: 'gold', price: 72000, discountedPrice: 64800, brand: 'Gayatri', quantity: 4, collectionName: 'wedding', sizes: [{ weight: '25g', size: '22 inch', stock: 4 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731944/fod-necklace_wrjwfl.webp' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'chain' },
    { title: 'Diamond Bridal Ring', description: 'Stunning diamond ring for wedding day', details: '18KT white gold with emerald-cut diamond 0.8ct', occasion: 'bridal', type: 'diamond', color: 'white', price: 180000, discountedPrice: 162000, brand: 'Gayatri', quantity: 2, collectionName: 'wedding', sizes: [{ weight: '5g', size: '16', stock: 2 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439067/3_xwvjdr.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'bridal-ring' },
    { title: 'Bridal Pendant Gold', description: 'Ornate gold pendant for bridal look', details: '22KT gold with ruby and diamond accents', occasion: 'bridal', type: 'gold', color: 'gold', price: 28000, discountedPrice: 25200, brand: 'Gayatri', quantity: 6, collectionName: 'wedding', sizes: [{ weight: '4g', size: 'Standard', stock: 6 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439065/2_ao746r.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'pendant' },
    { title: 'Wedding Drop Earrings Diamond', description: 'Elegant diamond drop earrings for wedding', details: '18KT white gold with pear-shaped diamonds, 1ct total', occasion: 'bridal', type: 'diamond', color: 'white', price: 125000, discountedPrice: 112500, brand: 'Gayatri', quantity: 3, collectionName: 'wedding', sizes: [{ weight: '4g', size: 'Standard', stock: 3 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439069/1_hvyglx.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'drop' },
];

async function seedWedding() {
    try {
        await mongoose.connect(MONGO_URL, { serverSelectionTimeoutMS: 8000 });
        console.log('Connected to MongoDB:', MONGO_URL);

        let created = 0;
        let skipped = 0;

        for (const p of WEDDING_PRODUCTS) {
            const existing = await Product.findOne({ title: p.title });
            if (existing) { console.log(`Skip: ${p.title}`); skipped++; continue; }

            let top = await Category.findOne({ name: p.topLevelCategory });
            if (!top) top = await new Category({ name: p.topLevelCategory, level: 1 }).save();

            let sec = await Category.findOne({ name: p.secondLevelCategory, parentCategory: top._id });
            if (!sec) sec = await new Category({ name: p.secondLevelCategory, parentCategory: top._id, level: 2 }).save();

            let thi = await Category.findOne({ name: p.thirdLevelCategory, parentCategory: sec._id });
            if (!thi) thi = await new Category({ name: p.thirdLevelCategory, parentCategory: sec._id, level: 3 }).save();

            await new Product({
                title: p.title, description: p.description, details: p.details,
                occasion: p.occasion, type: p.type, color: p.color,
                price: p.price, discountedPrice: p.discountedPrice,
                discountPercent: Math.floor(((p.price - p.discountedPrice) / p.price) * 100),
                sizes: p.sizes, imageUrls: p.imageUrls, brand: p.brand,
                quantity: p.quantity, collectionName: p.collectionName,
                category: thi._id,
            }).save();

            console.log(`Created: ${p.title}`);
            created++;
        }

        console.log(`\nDone! Created ${created}, skipped ${skipped}.`);
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await mongoose.disconnect();
    }
}

seedWedding();

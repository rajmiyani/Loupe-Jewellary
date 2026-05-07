/**
 * Seed Script: Insert sample jewellery products directly into MongoDB.
 * Covers ALL categories and types from the navigation menu.
 * Run: node src/scripts/seedProducts.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/category.model');
const Product = require('../models/product.model');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';

const ALL_PRODUCTS = [
    // ---- EARRINGS ----
    { title: 'Gold Jhumka Earrings', description: 'Traditional gold jhumka earrings', details: '22KT gold with enamel work', occasion: 'traditional-ethenic', type: 'gold', color: 'gold', price: 25000, discountedPrice: 22000, brand: 'Gayatri', quantity: 10, collectionName: 'best-sellers', sizes: [{ weight: '5g', size: 'Standard', stock: 10 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439069/1_hvyglx.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'earring' },
    { title: 'Diamond Drop Earrings', description: 'Elegant diamond drop earrings', details: '18KT white gold with 0.5ct diamonds', occasion: 'engagement', type: 'diamond', color: 'white', price: 85000, discountedPrice: 76500, brand: 'Gayatri', quantity: 5, collectionName: 'new-arrival', sizes: [{ weight: '4g', size: 'Standard', stock: 5 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439069/1_hvyglx.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'earring' },
    { title: 'Silver Stud Earrings', description: 'Simple silver stud earrings for daily wear', details: '925 sterling silver with cubic zirconia', occasion: 'casual', type: 'silver', color: 'silver', price: 3500, discountedPrice: 2800, brand: 'Gayatri', quantity: 20, collectionName: 'reccomanded', sizes: [{ weight: '2g', size: 'Standard', stock: 20 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439069/1_hvyglx.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'earring' },

    // ---- EARRING SUB-TYPES ----
    { title: 'Gold Drop Earrings with Pearls', description: 'Graceful drop earrings with freshwater pearls', details: '22KT gold with cultured pearls, 3cm drop', occasion: 'casual', type: 'gold', color: 'gold', price: 19000, discountedPrice: 17100, brand: 'Gayatri', quantity: 10, collectionName: 'reccomanded', sizes: [{ weight: '4g', size: 'Standard', stock: 10 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439069/1_hvyglx.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'drop' },
    { title: 'Sapphire Gemstone Drop Earrings', description: 'Royal blue sapphire drop earrings in gold', details: '22KT gold with blue sapphires, 0.8ct each', occasion: 'bridal', type: 'gemstone', color: 'blue', price: 88000, discountedPrice: 79200, brand: 'Gayatri', quantity: 3, collectionName: 'reccomanded', sizes: [{ weight: '4g', size: 'Standard', stock: 3 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439069/1_hvyglx.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'drop' },
    { title: 'Gold Hoop Earrings', description: 'Classic plain gold hoop earrings', details: '22KT gold plain polished hoops, 2cm diameter', occasion: 'casual', type: 'gold', color: 'gold', price: 14000, discountedPrice: 12600, brand: 'Gayatri', quantity: 15, collectionName: 'best-sellers', sizes: [{ weight: '3g', size: 'Standard', stock: 15 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439069/1_hvyglx.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'hoop' },
    { title: 'Platinum Hoop Earrings', description: 'Sleek and modern platinum hoops', details: 'Platinum 950 polished hoops, 2.5cm diameter', occasion: 'office', type: 'platinum', color: 'silver', price: 55000, discountedPrice: 49500, brand: 'Gayatri', quantity: 5, collectionName: 'reccomanded', sizes: [{ weight: '4g', size: 'Standard', stock: 5 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439069/1_hvyglx.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'hoop' },
    { title: 'Traditional Gold Jhumka with Beads', description: 'Ornate gold jhumka with bead work', details: '22KT gold with enamel bead work and bell design, 5cm', occasion: 'traditional-ethenic', type: 'gold', color: 'gold', price: 30000, discountedPrice: 27000, brand: 'Gayatri', quantity: 8, collectionName: 'best-sellers', sizes: [{ weight: '7g', size: 'Standard', stock: 8 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439069/1_hvyglx.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'jhumka' },
    { title: 'Diamond Stud Earrings', description: 'Timeless round brilliant diamond studs', details: '18KT white gold with 0.25ct diamonds each', occasion: 'office', type: 'diamond', color: 'white', price: 65000, discountedPrice: 58500, brand: 'Gayatri', quantity: 6, collectionName: 'new-arrival', sizes: [{ weight: '2g', size: 'Standard', stock: 6 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439069/1_hvyglx.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'stud' },

    // ---- RINGS ----
    { title: 'Gold Engagement Ring', description: 'Classic solitaire engagement ring', details: '22KT gold with 0.3ct diamond solitaire', occasion: 'engagement', type: 'gold', color: 'gold', price: 45000, discountedPrice: 40500, brand: 'Gayatri', quantity: 8, collectionName: 'best-sellers', sizes: [{ weight: '4g', size: '16', stock: 8 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439067/3_xwvjdr.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'ring' },
    { title: 'Diamond Eternity Band', description: 'Stunning diamond eternity band in white gold', details: '18KT white gold with 1ct total diamonds', occasion: 'bridal', type: 'diamond', color: 'white', price: 120000, discountedPrice: 108000, brand: 'Gayatri', quantity: 3, collectionName: 'new-arrival', sizes: [{ weight: '5g', size: '17', stock: 3 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439067/3_xwvjdr.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'ring' },
    { title: 'Silver Oxidized Ring', description: 'Boho style oxidized silver ring', details: '925 sterling silver with oxidized finish', occasion: 'casual', type: 'silver', color: 'silver', price: 1800, discountedPrice: 1500, brand: 'Gayatri', quantity: 25, collectionName: 'reccomanded', sizes: [{ weight: '3g', size: '16', stock: 25 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439067/3_xwvjdr.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'ring' },
    { title: 'Platinum Solitaire Ring', description: 'Luxurious platinum ring with pear-shaped diamond', details: 'Platinum 950 with 0.5ct pear-shaped diamond', occasion: 'engagement', type: 'platinum', color: 'silver', price: 145000, discountedPrice: 130500, brand: 'Gayatri', quantity: 3, collectionName: 'new-arrival', sizes: [{ weight: '5g', size: '16', stock: 3 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439067/3_xwvjdr.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'ring' },
    { title: 'Ruby Gemstone Gold Ring', description: 'Vibrant ruby ring in 22KT gold with diamond halo', details: '22KT gold with Burmese ruby 1.5ct and diamond halo', occasion: 'traditional-ethenic', type: 'gemstone', color: 'gold', price: 55000, discountedPrice: 49500, brand: 'Gayatri', quantity: 6, collectionName: 'best-sellers', sizes: [{ weight: '5g', size: '16', stock: 6 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439067/3_xwvjdr.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'ring' },

    // ---- RING SUB-TYPES ----
    { title: 'Gold Solitaire Engagement Ring', description: 'Solitaire engagement ring with princess-cut diamond', details: '22KT gold with 0.4ct princess-cut diamond', occasion: 'engagement', type: 'gold', color: 'gold', price: 80000, discountedPrice: 72000, brand: 'Gayatri', quantity: 4, collectionName: 'best-sellers', sizes: [{ weight: '5g', size: '16', stock: 4 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439067/3_xwvjdr.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'eangagement-ring' },
    { title: 'Pearl Statement Ring', description: 'Elegant freshwater pearl cocktail ring', details: '22KT gold with South Sea pearl, 12mm', occasion: 'traditional-ethenic', type: 'gold', color: 'gold', price: 22000, discountedPrice: 19800, brand: 'Gayatri', quantity: 9, collectionName: 'reccomanded', sizes: [{ weight: '4g', size: '17', stock: 9 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439067/3_xwvjdr.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'pearl-ring' },
    { title: 'Bridal Ring Set Gold', description: 'Complete bridal ring set with band', details: '22KT gold engagement ring and matching band', occasion: 'bridal', type: 'gold', color: 'gold', price: 95000, discountedPrice: 85500, brand: 'Gayatri', quantity: 3, collectionName: 'new-arrival', sizes: [{ weight: '8g', size: '16', stock: 3 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439067/3_xwvjdr.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'bridal-ring' },
    { title: 'Gold Couple Rings Set', description: 'Matching couple ring set in 22KT gold', details: '22KT gold plain polished matching pair', occasion: 'engagement', type: 'gold', color: 'gold', price: 35000, discountedPrice: 31500, brand: 'Gayatri', quantity: 7, collectionName: 'best-sellers', sizes: [{ weight: '6g', size: '16 & 19', stock: 7 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439067/3_xwvjdr.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'couple-ring' },

    // ---- PENDANTS ----
    { title: 'Gold Ganesh Pendant', description: 'Auspicious Lord Ganesh gold pendant', details: '22KT gold with intricate Ganesh engraving', occasion: 'traditional-ethenic', type: 'gold', color: 'gold', price: 18000, discountedPrice: 16200, brand: 'Gayatri', quantity: 12, collectionName: 'best-sellers', sizes: [{ weight: '3g', size: 'Standard', stock: 12 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439065/2_ao746r.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'pendant' },
    { title: 'Diamond Heart Pendant', description: 'Romantic diamond heart pendant in white gold', details: '18KT white gold with pave-set diamonds', occasion: 'engagement', type: 'diamond', color: 'white', price: 55000, discountedPrice: 49500, brand: 'Gayatri', quantity: 6, collectionName: 'new-arrival', sizes: [{ weight: '2.5g', size: 'Standard', stock: 6 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439065/2_ao746r.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'pendant' },
    { title: 'Platinum Diamond Pendant', description: 'Minimalist platinum pendant with marquise diamond', details: 'Platinum 950 with 0.3ct marquise diamond', occasion: 'modern', type: 'platinum', color: 'silver', price: 98000, discountedPrice: 88200, brand: 'Gayatri', quantity: 4, collectionName: 'best-sellers', sizes: [{ weight: '2g', size: 'Standard', stock: 4 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439065/2_ao746r.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'pendant' },
    { title: 'Emerald Gemstone Pendant', description: 'Stunning Colombian emerald pendant in white gold', details: '18KT white gold with Colombian emerald 1ct', occasion: 'modern', type: 'gemstone', color: 'green', price: 72000, discountedPrice: 64800, brand: 'Gayatri', quantity: 4, collectionName: 'new-arrival', sizes: [{ weight: '3g', size: 'Standard', stock: 4 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439065/2_ao746r.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'pendant' },

    // ---- MANGALSUTRAS ----
    { title: 'Traditional Gold Mangalsutra', description: 'Classic black bead mangalsutra', details: '22KT gold with black beads, 18-inch', occasion: 'bridal', type: 'gold', color: 'gold', price: 35000, discountedPrice: 31500, brand: 'Gayatri', quantity: 8, collectionName: 'best-sellers', sizes: [{ weight: '8g', size: '18 inch', stock: 8 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731944/fod-mangalsutra_zb7tpy.webp' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'mangal-sutra' },
    { title: 'Diamond Mangalsutra', description: 'Modern diamond mangalsutra', details: '18KT white gold with VS diamonds, 16-inch', occasion: 'bridal', type: 'diamond', color: 'white', price: 95000, discountedPrice: 85500, brand: 'Gayatri', quantity: 4, collectionName: 'new-arrival', sizes: [{ weight: '6g', size: '16 inch', stock: 4 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731944/fod-mangalsutra_zb7tpy.webp' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'mangal-sutra' },

    // ---- CHAINS ----
    { title: 'Gold Singapore Chain', description: 'Delicate Singapore chain in 22KT gold', details: '22KT gold box-link design, 20-inch', occasion: 'casual', type: 'gold', color: 'gold', price: 28000, discountedPrice: 25200, brand: 'Gayatri', quantity: 15, collectionName: 'reccomanded', sizes: [{ weight: '5g', size: '20 inch', stock: 15 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731944/fod-necklace_wrjwfl.webp' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'chain' },
    { title: 'Silver Rope Chain', description: 'Chunky rope chain in sterling silver', details: '925 sterling silver rope-link, 22-inch', occasion: 'casual', type: 'silver', color: 'silver', price: 4500, discountedPrice: 3800, brand: 'Gayatri', quantity: 18, collectionName: 'best-sellers', sizes: [{ weight: '10g', size: '22 inch', stock: 18 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731944/fod-necklace_wrjwfl.webp' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'chain' },

    // ---- BRACELETS ----
    { title: 'Gold Charm Bracelet', description: 'Delicate gold charm bracelet with floral charms', details: '22KT gold with four floral charms, 7-inch', occasion: 'casual', type: 'gold', color: 'gold', price: 22000, discountedPrice: 19800, brand: 'Gayatri', quantity: 10, collectionName: 'new-arrival', sizes: [{ weight: '4g', size: '7 inch', stock: 10 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731943/fod-bracelet_um6zoo.webp' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'bracelet' },
    { title: 'Diamond Tennis Bracelet', description: 'Classic diamond tennis bracelet', details: '18KT white gold with 2ct total diamonds', occasion: 'modern', type: 'diamond', color: 'white', price: 180000, discountedPrice: 162000, brand: 'Gayatri', quantity: 2, collectionName: 'best-sellers', sizes: [{ weight: '6g', size: '7 inch', stock: 2 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731943/fod-bracelet_um6zoo.webp' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'bracelet' },
    { title: 'Minimalist Gold Bracelet', description: 'Thin gold chain bracelet for office wear', details: '22KT gold thin chain bracelet', occasion: 'office', type: 'gold', color: 'gold', price: 16000, discountedPrice: 14400, brand: 'Gayatri', quantity: 20, collectionName: 'reccomanded', sizes: [{ weight: '2.5g', size: '7 inch', stock: 20 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731943/fod-bracelet_um6zoo.webp' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'bracelet' },

    // ---- BANGLES ----
    { title: 'Gold Plain Bangle Set', description: 'Set of 4 plain gold bangles', details: '22KT gold plain polished bangles, set of 4', occasion: 'traditional-ethenic', type: 'gold', color: 'gold', price: 60000, discountedPrice: 54000, brand: 'Gayatri', quantity: 7, collectionName: 'best-sellers', sizes: [{ weight: '20g', size: '2.6', stock: 7 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731879/fod-bangle_bsxfzl.webp' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'bangle' },
    { title: 'Diamond Bangle', description: 'Diamond-studded gold bangle', details: '18KT gold with pave-set full-circumference diamonds', occasion: 'bridal', type: 'diamond', color: 'gold', price: 195000, discountedPrice: 175500, brand: 'Gayatri', quantity: 2, collectionName: 'new-arrival', sizes: [{ weight: '15g', size: '2.6', stock: 2 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731879/fod-bangle_bsxfzl.webp' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'bangle' },

    // ---- NECKLACES ----
    { title: 'Kundan Bridal Necklace', description: 'Elaborate Kundan bridal necklace', details: 'Gold-plated brass with Kundan stones and meenakari', occasion: 'bridal', type: 'gold', color: 'gold', price: 15000, discountedPrice: 13500, brand: 'Gayatri', quantity: 6, collectionName: 'reccomanded', sizes: [{ weight: '80g', size: 'Standard', stock: 6 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1707742460/45_eqespc.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'necklace' },
    { title: 'Gold Layered Necklace', description: 'Trendy triple-layer gold necklace', details: '22KT gold with three chains of different lengths', occasion: 'modern', type: 'gold', color: 'gold', price: 42000, discountedPrice: 37800, brand: 'Gayatri', quantity: 9, collectionName: 'new-arrival', sizes: [{ weight: '12g', size: 'Standard', stock: 9 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1707742460/45_eqespc.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'necklace' },
    { title: 'Diamond Solitaire Necklace', description: 'Timeless diamond solitaire necklace', details: '18KT white gold with 0.5ct princess-cut diamond', occasion: 'engagement', type: 'diamond', color: 'white', price: 75000, discountedPrice: 67500, brand: 'Gayatri', quantity: 5, collectionName: 'best-sellers', sizes: [{ weight: '3g', size: '18 inch', stock: 5 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1707742460/45_eqespc.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'necklace' },
    { title: 'Silver Tribal Necklace', description: 'Oxidized silver necklace with tribal motifs', details: '925 sterling silver with oxidized tribal pattern', occasion: 'traditional-ethenic', type: 'silver', color: 'silver', price: 6500, discountedPrice: 5500, brand: 'Gayatri', quantity: 14, collectionName: 'reccomanded', sizes: [{ weight: '25g', size: 'Standard', stock: 14 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1707742460/45_eqespc.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'necklace' },
    { title: 'Silver Office Necklace', description: 'Elegant silver necklace for professional settings', details: '925 sterling silver minimalist pendant necklace', occasion: 'office', type: 'silver', color: 'silver', price: 5500, discountedPrice: 4950, brand: 'Gayatri', quantity: 18, collectionName: 'new-arrival', sizes: [{ weight: '5g', size: '18 inch', stock: 18 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1707742460/45_eqespc.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'necklace' },

    // ---- LOCKETS ----
    { title: 'Gold Locket with Lord Krishna', description: 'Devotional gold locket with Krishna engraving', details: '22KT gold with hand-carved Krishna motif', occasion: 'traditional-ethenic', type: 'gold', color: 'gold', price: 12000, discountedPrice: 10800, brand: 'Gayatri', quantity: 12, collectionName: 'best-sellers', sizes: [{ weight: '2g', size: 'Standard', stock: 12 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439065/2_ao746r.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'locket' },
    { title: 'Diamond Locket Round', description: 'Elegant round diamond locket in white gold', details: '18KT white gold with pave-set diamonds, chain included', occasion: 'modern', type: 'diamond', color: 'white', price: 48000, discountedPrice: 43200, brand: 'Gayatri', quantity: 5, collectionName: 'new-arrival', sizes: [{ weight: '2.5g', size: 'Standard', stock: 5 }], imageUrls: [{ imageUrl: 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439065/2_ao746r.jpg' }], topLevelCategory: 'jewellery', secondLevelCategory: "women's jewellery", thirdLevelCategory: 'locket' },
];

async function seedProducts() {
    try {
        await mongoose.connect(MONGO_URL, { serverSelectionTimeoutMS: 8000 });
        console.log('✅ Connected to MongoDB:', MONGO_URL);

        let created = 0;
        let skipped = 0;

        for (const p of ALL_PRODUCTS) {
            const existing = await Product.findOne({ title: p.title });
            if (existing) {
                console.log(`⏭  Skipped (already exists): ${p.title}`);
                skipped++;
                continue;
            }

            let topLevel = await Category.findOne({ name: p.topLevelCategory });
            if (!topLevel) topLevel = await new Category({ name: p.topLevelCategory, level: 1 }).save();

            let secondLevel = await Category.findOne({ name: p.secondLevelCategory, parentCategory: topLevel._id });
            if (!secondLevel) secondLevel = await new Category({ name: p.secondLevelCategory, parentCategory: topLevel._id, level: 2 }).save();

            let thirdLevel = await Category.findOne({ name: p.thirdLevelCategory, parentCategory: secondLevel._id });
            if (!thirdLevel) thirdLevel = await new Category({ name: p.thirdLevelCategory, parentCategory: secondLevel._id, level: 3 }).save();

            const product = new Product({
                title: p.title, description: p.description, details: p.details,
                occasion: p.occasion, type: p.type, color: p.color,
                price: p.price, discountedPrice: p.discountedPrice,
                discountPercent: Math.floor(((p.price - p.discountedPrice) / p.price) * 100),
                sizes: p.sizes, imageUrls: p.imageUrls, brand: p.brand,
                quantity: p.quantity, collectionName: p.collectionName,
                category: thirdLevel._id,
            });

            await product.save();
            console.log(`✅ Created: ${p.title} [${p.thirdLevelCategory}]`);
            created++;
        }

        console.log(`\n🎉 Done! Created ${created} products, skipped ${skipped} existing.`);
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected.');
    }
}

seedProducts();

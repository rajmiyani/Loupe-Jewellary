import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BestSellerCard from './BestSellerCard';

const categories = [
  "All",
  "Rings",
  "Earrings",
  "Bracelets",
  "Pendants",
  "Necklaces",
  "Charms"
];

// Fallback showcase products matching the regular catalogue
const FALLBACK_PRODUCTS = [
  {
    _id: "cyj-1",
    title: "Hexagon Cluster Diamond Stud Earrings",
    brand: "LOUPE JEWELLER",
    category: { name: "earrings" },
    secondLevelCategory: "earrings",
    imageUrl: "/product/earring-1.jpg",
    minPrice: 18000,
    maxPrice: 45000,
  },
  {
    _id: "cyj-2",
    title: "GG Buckle Diamond Stud Earrings",
    brand: "LOUPE JEWELLER",
    category: { name: "earrings" },
    secondLevelCategory: "earrings",
    imageUrl: "/product/earring-2.jpg",
    minPrice: 20000,
    maxPrice: 50000,
  },
  {
    _id: "cyj-3",
    title: "Infinity Diamond Ring",
    brand: "LOUPE JEWELLER",
    category: { name: "rings" },
    secondLevelCategory: "rings",
    imageUrl: "/product/collectioncircle_ringmain.jpg",
    minPrice: 20000,
    maxPrice: 45000,
  },
  {
    _id: "cyj-4",
    title: "Trio Cluster Bezel Diamond Stud Earrings",
    brand: "LOUPE JEWELLER",
    category: { name: "earrings" },
    secondLevelCategory: "earrings",
    imageUrl: "/product/earring.jpg",
    minPrice: 25000,
    maxPrice: 60000,
  }
];

const ChooseYourJewellery = ({ products = [] }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleViewFullCollection = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (activeCategory === "All") {
      navigate(`/all-jewellery`);
    } else {
      navigate(`/all-jewellery/category/${activeCategory.toLowerCase()}`);
    }
  };

  // Resilient category matching (handles singular/plural, category objects, titles)
  const matchesCategory = (product, category) => {
    if (!product || category === "All") return true;
    const target = category.toLowerCase();
    const targetSingular = target.endsWith('s') ? target.slice(0, -1) : target;
    const catName = (product?.category?.name || product?.secondLevelCategory || product?.title || "").toLowerCase();
    return catName.includes(targetSingular);
  };

  // Filter products by active category
  const sourceProducts = products && products.length > 0 ? products : FALLBACK_PRODUCTS;
  const filteredProducts = activeCategory === "All"
    ? sourceProducts
    : sourceProducts.filter((p) => matchesCategory(p, activeCategory));

  // Fallback if active category has no items in DB
  const displayList = filteredProducts.length > 0 
    ? filteredProducts 
    : (activeCategory === "All" 
        ? FALLBACK_PRODUCTS 
        : FALLBACK_PRODUCTS.filter((p) => matchesCategory(p, activeCategory)));

  const displayProducts = displayList.slice(0, 4);

  return (
    <Box sx={{ py: { xs: 6, md: 12 }, bgcolor: '#ffffff', overflow: 'hidden' }}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
        
        {/* Top small title */}
        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: '#3c7399',
            textTransform: 'uppercase',
            mb: 1
          }}
        >
          ATTRACTIVE JEWELLERY
        </Typography>

        {/* Main Title: Choose Your Jewellery */}
        <Typography
          sx={{
            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 500,
            fontFamily: "'Playfair Display', serif",
            color: '#000000',
            mb: 1.5
          }}
        >
          Choose Your Jewellery
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            fontSize: { xs: '0.85rem', md: '1rem' },
            color: '#666666',
            fontWeight: 400,
            maxWidth: '600px',
            mx: 'auto',
            mb: { xs: 3, md: 5 },
            px: 2
          }}
        >
          Get your stunning diamond jewellery with fast, one-day shipping for ultimate convenience and style.
        </Typography>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 md:gap-3 overflow-x-auto no-scrollbar py-2 px-1 mb-6 sm:mb-10 flex-nowrap sm:flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-1.5 sm:px-6 sm:py-2 rounded-full font-medium text-xs sm:text-sm whitespace-nowrap transition-all duration-300 flex-shrink-0 cursor-pointer ${
                activeCategory === category
                  ? 'bg-[#3c7399] text-white shadow-md font-semibold'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6"
            >
              {displayProducts.length > 0 ? (
                displayProducts.map((product, index) => (
                  <BestSellerCard key={product._id || product.id || index} product={product} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-gray-500">
                  <Typography variant="h6">No products found for {activeCategory}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>Check back later for new arrivals.</Typography>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View Full Collection Button */}
        <div className="mt-12 flex justify-center px-4">
          <Button
            onClick={handleViewFullCollection}
            variant="contained"
            endIcon={<span className="text-base leading-none">→</span>}
            sx={{
              bgcolor: '#3c7399',
              color: '#ffffff',
              px: { xs: 4, sm: 6 },
              py: { xs: 1.5, sm: 1.8 },
              borderRadius: '100px',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              boxShadow: '0 4px 15px rgba(60, 115, 153, 0.25)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              whiteSpace: 'nowrap',
              '&:hover': {
                bgcolor: '#2c5775',
                boxShadow: '0 8px 25px rgba(60, 115, 153, 0.4)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            View Full Collection
          </Button>
        </div>

      </div>
    </Box>
  );
};

export default ChooseYourJewellery;

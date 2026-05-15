import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getWish, addWishItem, removeWishItem } from '../../../state/wishlist/Action';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, IconButton, Grid, Paper } from "@mui/material";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { formatPriceINR } from "../../../utils/price";
import { motion, AnimatePresence } from "framer-motion";

const WishList = () => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector(store => store);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getWish());
  }, [wishlist.deleteWishItem]);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeWishItem(productId));
  };

  return (
    <Box sx={{ py: 2 }}>
      <AnimatePresence mode="wait">
        {wishlist?.wishItems?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center rounded-[32px] bg-white border border-dashed border-gray-200"
          >
            <Box sx={{ p: 4, borderRadius: '50%', bgcolor: 'rgba(151, 194, 213, 0.05)', mb: 4 }}>
              <Heart size={64} className="text-[#755970] opacity-40" strokeWidth={1} />
            </Box>
            <Typography sx={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", color: '#755970', mb: 1.5, letterSpacing: -0.5 }}>
              Your Curated Treasures
            </Typography>
            <Typography sx={{ fontSize: '0.95rem', color: '#64748b', mb: 5, maxWidth: 450, lineHeight: 1.6 }}>
              Experience the art of curation. Start adding exclusive Loupe pieces that speak to your individual elegance.
            </Typography>
            <Button
              onClick={() => navigate('/')}
              variant="contained"
              sx={{
                bgcolor: '#755970',
                color: 'white',
                px: 8,
                py: 2.2,
                borderRadius: '16px',
                fontSize: '0.8rem',
                fontWeight: 900,
                letterSpacing: 3,
                textTransform: 'uppercase',
                '&:hover': { bgcolor: '#755970', transform: 'translateY(-2px)' },
                transition: 'all 0.3s'
              }}
            >
              Explore Collections
            </Button>
          </motion.div>
        ) : (
          <Grid container spacing={4}>
            {wishlist.wishItems.map((item, index) => {
              const product = item?.product;
              if (!product || !product._id) return null;

              return (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        borderRadius: '32px',
                        overflow: 'hidden',
                        bgcolor: 'white',
                        border: '1px solid #f1f5f9',
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        '&:hover': {
                          boxShadow: '0 30px 60px rgba(15, 23, 42, 0.08)',
                          transform: 'translateY(-8px)',
                          '& .action-overlay': { opacity: 1 },
                          '& .product-img': { transform: 'scale(1.08)' }
                        }
                      }}
                    >
                      {/* Portrait Image Frame */}
                      <Box sx={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
                        <img
                          src={product?.imageUrls?.[0]?.imageUrl}
                          alt={product?.title}
                          className="product-img w-full h-full object-cover transition-transform duration-[1.5s] ease-out"
                        />

                        {/* Action Overlay */}
                        <div className="action-overlay absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                          <IconButton
                            onClick={() => handleRemoveFromWishlist(product._id)}
                            sx={{ bgcolor: 'white', color: '#ef4444', p: 2, '&:hover': { bgcolor: '#ef4444', color: 'white' } }}
                          >
                            <Trash2 size={24} />
                          </IconButton>
                        </div>

                        {/* Status Pin */}
                        <div className="absolute top-6 right-6">
                          <Box sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            p: 1.5,
                            borderRadius: '50%',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                          }}>
                            <Heart size={20} fill="#ef4444" color="#ef4444" />
                          </Box>
                        </div>
                      </Box>

                      {/* Details Section */}
                      <Box sx={{ p: 4 }}>
                        <Typography
                          onClick={() => navigate(`/product/${product?._id}`)}
                          sx={{
                            fontSize: '1.2rem',
                            fontWeight: 300,
                            fontFamily: "'Playfair Display', serif",
                            color: '#755970',
                            mb: 1.5,
                            cursor: 'pointer',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {product?.title}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                          <Box className="flex items-baseline gap-2">
                            <Typography sx={{ fontSize: '1.4rem', fontWeight: 900, color: '#755970', fontFamily: "'Outfit', sans-serif" }}>
                              â‚¹{formatPriceINR(product?.discountedPrice)}
                            </Typography>
                            <Typography sx={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                              â‚¹{formatPriceINR(product?.price)}
                            </Typography>
                          </Box>
                          <div className="px-3 py-1 bg-[#755970]/10 rounded-full">
                            <Typography sx={{ fontSize: '0.65rem', color: '#755970', fontWeight: 900, letterSpacing: 1 }}>
                              {product?.discountPercent}% OFF
                            </Typography>
                          </div>
                        </Box>

                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<ShoppingBag size={18} />}
                          onClick={() => navigate(`/product/${product?._id}`)}
                          sx={{
                            bgcolor: '#755970',
                            color: 'white',
                            py: 2,
                            borderRadius: '16px',
                            fontSize: '0.8rem',
                            fontWeight: 900,
                            letterSpacing: 2,
                            textTransform: 'uppercase',
                            '&:hover': { bgcolor: '#755970' }
                          }}
                        >
                          Discover Piece
                        </Button>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default WishList;

import React, { useContext, useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Rating,
  TextField,
  Typography,
  Divider,
  MenuItem,
  Breadcrumbs,
  Link,
  IconButton
} from "@mui/material";
import { styled as selectStyle } from "@mui/material/styles";
import ProductReviewCard from "./ProductReviewCard";
import ProductRatingBox from "./ProductRatingBox";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../state/product/Action";
import { addItemToCart } from "../../../state/cart/Action";
import HomeSectionCarousel from "../HomeSectionCarousel/HomeSectionCarousel";
import { RRContext } from "../../../context/rrBox/rrContext";
import { toastNotify } from "../../../state/shared/toast";
import RatingReviewForm from "../MyOrders/RatingReviewForm";
import { formatPriceINR } from "../../../utils/price";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ChevronRight, Star, Heart, Share2 } from "lucide-react";

const ratingsData = [
  { category: "Excellent", rayingValue: 70, color: "success" },
  { category: "Very Good", rayingValue: 50, color: "warning" },
  { category: "Good", rayingValue: 30, color: "primary" },
  { category: "Average", rayingValue: 20, color: "secondary" },
  { category: "Poor", rayingValue: 10, color: "error" },
];

const CssTextField = selectStyle(TextField)({
  "& label.Mui-focused": { color: "var(--primary-burgundy)" },
  "& .MuiInput-underline:after": { borderBottomColor: "var(--primary-burgundy)" },
  "& .MuiOutlinedInput-root": {
    borderRadius: '12px',
    "& fieldset": { borderColor: "#e2e8f0" },
    "&:hover fieldset": { borderColor: "var(--primary-burgundy)" },
    "&.Mui-focused fieldset": { borderColor: "var(--primary-burgundy)" },
  },
});

export default function ProductDetails() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("");

  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);
  const modal = useContext(RRContext);

  useEffect(() => {
    dispatch(findProductById({ productId: param.productId }));
  }, [param.productId, products?.product?.reviews]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const requiresSize = Boolean(products?.product?.sizes?.[0]?.size);
    const requiresWeight = Boolean(products?.product?.sizes?.length);

    if ((requiresWeight && !selectedWeight) || (requiresSize && !selectedSize)) {
      toastNotify({
        type: 'error',
        title: 'Selection Required',
        description: 'Please select weight' + (requiresSize ? ' and size' : '') + ' before adding to cart.'
      });
      return;
    }

    dispatch(addItemToCart({ productId: param.productId, weight: selectedWeight }));
    navigate("/cart");
  };

  if (!products.product) return null;

  return (
    <div className="bg-[#fafafa] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Breadcrumbs separator={<ChevronRight size={14} />} aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/" sx={{ fontSize: '0.875rem' }}>Home</Link>
            <Link underline="hover" color="inherit" href="/jewellery" sx={{ fontSize: '0.875rem' }}>Jewellery</Link>
            <Typography color="text.primary" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>{products.product.title}</Typography>
          </Breadcrumbs>
        </motion.div>

        <Grid container spacing={8}>
          {/* Left: Image Gallery */}
          <Grid item xs={12} lg={7}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="aspect-square rounded-3xl overflow-hidden bg-white shadow-xl mb-6 relative group"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    src={products.product.imageUrls?.[activeIndex]?.imageUrl}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                <Box sx={{ position: 'absolute', top: 20, right: 20, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <IconButton sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#f1f5f9' }, shadow: 1 }}>
                    <Heart size={20} />
                  </IconButton>
                  <IconButton sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#f1f5f9' }, shadow: 1 }}>
                    <Share2 size={20} />
                  </IconButton>
                </Box>
              </motion.div>

              <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2, '::-webkit-scrollbar': { display: 'none' } }}>
                {products.product.imageUrls?.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    onClick={() => setActiveIndex(i)}
                    className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${activeIndex === i ? 'border-[var(--primary-burgundy)] shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                  >
                    <img src={item.imageUrl} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right: Product Info */}
          <Grid item xs={12} lg={5}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography variant="overline" sx={{ color: 'var(--primary-gold)', fontWeight: 800, letterSpacing: 2 }}>
                {products.product.brand}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: 'var(--primary-burgundy)', fontSize: { xs: '2rem', md: '2.5rem' } }}>
                {products.product.title}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'var(--primary-burgundy)', color: 'white', px: 1.5, py: 0.5, borderRadius: '8px', gap: 0.5 }}>
                  <Typography variant="subtitle2" fontWeight="bold">4.2</Typography>
                  <Star size={14} fill="currentColor" />
                </Box>
                <Typography variant="body2" color="textSecondary" fontWeight="600">
                  48 Verified Reviews
                </Typography>
              </Box>

              <Divider sx={{ mb: 4 }} />

              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, mb: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'var(--text-dark)' }}>
                    ₹{formatPriceINR(products.product.discountedPrice)}
                  </Typography>
                  <Typography variant="h6" sx={{ textDecoration: 'line-through', color: 'text.secondary', opacity: 0.6 }}>
                    ₹{formatPriceINR(products.product.price)}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#10b981', fontWeight: 800 }}>
                    {products.product.discountPercent}% OFF
                  </Typography>
                </Box>
                <Typography variant="caption" color="textSecondary">Inclusive of all taxes</Typography>
              </Box>

              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 6 }}>
                {products.product.description}
              </Typography>

              <Box component="form" sx={{ mb: 6 }}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 700 }}>Weight Options</Typography>
                    <CssTextField
                      select
                      fullWidth
                      value={selectedWeight}
                      onChange={(e) => setSelectedWeight(e.target.value)}
                    >
                      {products.product.sizes?.map((wt) => (
                        <MenuItem key={wt.weight} value={wt.weight}>{wt.weight}</MenuItem>
                      ))}
                    </CssTextField>
                  </Grid>

                  {products.product.sizes?.[0]?.size && (
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 700 }}>Size Selection</Typography>
                      <CssTextField
                        select
                        fullWidth
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                      >
                        {products.product.sizes?.map((s) => (
                          <MenuItem key={s.size} value={s.size}>{s.size}</MenuItem>
                        ))}
                      </CssTextField>
                    </Grid>
                  )}
                </Grid>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleAddToCart}
                    variant="contained"
                    fullWidth
                    startIcon={<ShoppingBag size={20} />}
                    sx={{
                      mt: 6,
                      py: 2,
                      borderRadius: '16px',
                      bgcolor: 'black',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      '&:hover': { bgcolor: 'var(--primary-burgundy)' },
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    }}
                  >
                    Add to Luxe Cart
                  </Button>
                </motion.div>
              </Box>

              <Box sx={{ bgcolor: 'white', p: 3, borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                <Grid container spacing={2}>
                  {[
                    { label: 'Color', value: products.product.color },
                    { label: 'Occasion', value: products.product.occasion },
                    { label: 'Type', value: products.product.type }
                  ].map((spec, i) => (
                    <Grid item xs={4} key={i}>
                      <Typography variant="caption" color="textSecondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>
                        {spec.label}
                      </Typography>
                      <Typography variant="body2" fontWeight="600" sx={{ textTransform: 'capitalize' }}>
                        {spec.value}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Reviews Section */}
        <Box sx={{ mt: 15, mb: 10 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 6, color: 'var(--primary-burgundy)' }}>
            Customer Reflections
          </Typography>
          <Grid container spacing={8}>
            <Grid item xs={12} lg={7}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {products.product.reviews?.length > 0 ? (
                  products.product.reviews.map((rev, i) => (
                    <ProductReviewCard key={i} reviewData={rev} ratingData={products.product.ratings?.[i]} />
                  ))
                ) : (
                  <Box sx={{ p: 10, textAlign: 'center', bgcolor: 'white', borderRadius: '30px', border: '2px dashed #e2e8f0' }}>
                    <Typography variant="h6" color="textSecondary" gutterBottom>No reviews yet</Typography>
                    <Typography variant="body2" color="textSecondary">Be the first to share your experience with this masterpiece.</Typography>
                  </Box>
                )}
                <Button
                  onClick={() => { navigate(`/product/${param.productId}/ratrev`); modal.openModal(); }}
                  variant="outlined"
                  sx={{ mt: 2, borderRadius: '12px', color: 'var(--primary-burgundy)', borderColor: 'var(--primary-burgundy)', height: 50 }}
                >
                  Share Your Story
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} lg={5}>
              <Box sx={{ p: 4, bgcolor: 'white', borderRadius: '30px', shadow: 1 }}>
                <Typography variant="h6" fontWeight="800" sx={{ mb: 3 }}>Refinement Overview</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                  <Typography variant="h2" fontWeight="800">4.6</Typography>
                  <Box>
                    <Rating value={4.6} precision={0.5} readOnly sx={{ color: 'var(--primary-gold)' }} />
                    <Typography variant="body2" color="textSecondary">Based on 5,643 experiences</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {ratingsData.map((r, i) => (
                    <ProductRatingBox key={i} category={r.category} ratingValue={r.rayingValue} color={r.color} />
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Similar Products */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 6, color: 'var(--primary-burgundy)' }}>
            Curated For You
          </Typography>
          <HomeSectionCarousel sectionLabel={"similar"} sectionCategory={products.product.category?.name} />
        </Box>
      </div>

      <RatingReviewForm open={modal.state} handleClose={() => modal.closeModal()} />
    </div>
  );
}

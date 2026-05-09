import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../state/product/Action';
import {
  Box, Grid, TextField, Button, Typography, FormControl,
  InputLabel, Select, MenuItem, Card, CardContent, Avatar,
  Divider, Chip, IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Upload, Plus, Trash2, Package, Tag, Image, Layers, DollarSign, BarChart3, ChevronRight, Gem, Ruler, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const BRAND = '#97c2d5';
const BRAND_LIGHT = '#f0f9ff';
const BRAND_DARK = '#5fa0b8';

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': { color: BRAND },
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    '& fieldset': { borderColor: '#e2e8f0' },
    '&:hover fieldset': { borderColor: BRAND },
    '&.Mui-focused fieldset': { borderColor: BRAND, borderWidth: 2 },
  },
  '& .MuiInputLabel-root': { fontWeight: 600 },
});

const StyledSelect = styled(Select)({
  borderRadius: '12px',
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: BRAND, borderWidth: 2 },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: BRAND },
});

const SectionHeader = ({ icon, title, description }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
    <Avatar sx={{ bgcolor: BRAND_LIGHT, color: BRAND, width: 44, height: 44, borderRadius: '12px' }}>
      {icon}
    </Avatar>
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#111827', letterSpacing: '-0.3px' }}>{title}</Typography>
      <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>{description}</Typography>
    </Box>
  </Box>
);

const initialSizes = [{ weight: 'g', size: 'MM', stock: 0 }];

const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    imageUrls: [],
    title: '',
    brand: '',
    color: '',
    discountedPrice: 0,
    price: 0,
    discountPercent: 0.0,
    description: '',
    details: '',
    occasion: '',
    quantity: 1,
    collectionName: '',
    type: '',
    sizes: initialSizes,
    topLevelCategory: '',
    secondLevelCategory: '',
    thirdLevelCategory: '',
    metalType: '',
    metalPurity: '',
    metalWeight: '',
    hallmarkCertification: '',
    metalColor: '',
    primaryStoneType: '',
    stoneShape: '',
    stoneWeight: '',
    ringSize: '',
    chainLength: '',
    pendantSize: '',
    dimensions: '',
    totalWeight: '',
  });

  const dispatch = useDispatch();

  const handleChange = async (e, index, type) => {
    const { name, value, files } = e.target;

    if (type === 'imageUrls' && files && files.length > 0) {
      const selectedFiles = Array.from(files).filter((f) => f.type?.startsWith('image/')).slice(0, 4);
      if (selectedFiles.length === 0) return;

      const uploadOne = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'myCloud');
        const res = await fetch('https://api.cloudinary.com/v1_1/deq0hxr3t/image/upload', {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) throw new Error('Failed to upload image');
        const data = await res.json();
        return data.secure_url;
      };

      try {
        const urls = await Promise.all(selectedFiles.map(uploadOne));
        setProductData((prev) => ({ ...prev, imageUrls: urls.slice(0, 4).map((u) => ({ imageUrl: u })) }));
      } catch (err) {
        console.error(err.message);
      }
      return;
    }

    if (type === 'sizes') {
      const updatedSizes = [...productData.sizes];
      updatedSizes[index] = { ...updatedSizes[index], [name]: value };
      setProductData({ ...productData, sizes: updatedSizes });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleAddSize = () => {
    setProductData((prev) => ({ ...prev, sizes: [...prev.sizes, { weight: 'g', size: 'MM', stock: 0 }] }));
  };

  const handleRemoveSize = (idx) => {
    setProductData((prev) => ({ ...prev, sizes: prev.sizes.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData));
    setProductData({
      imageUrls: [], title: '', brand: '', color: '',
      discountedPrice: 0, price: 0, discountPercent: 0.0,
      description: '', details: '', occasion: '', quantity: 1,
      collectionName: '', type: '', sizes: initialSizes,
      topLevelCategory: '', secondLevelCategory: '', thirdLevelCategory: '',
      metalType: '', metalPurity: '', metalWeight: '', hallmarkCertification: '',
      metalColor: '', primaryStoneType: '', stoneShape: '', stoneWeight: '',
      ringSize: '', chainLength: '', pendantSize: '', dimensions: '', totalWeight: '',
    });
  };

  return (
    <Box sx={{ p: { xs: 2, md: 0 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Admin Panel
            </Typography>
            <ChevronRight size={14} color="#94a3b8" />
            <Typography variant="caption" sx={{ color: BRAND, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Add New Product
            </Typography>
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#111827', letterSpacing: '-1px' }}>
            Create Product
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, mt: 0.5 }}>
            Fill in all the details to add a new jewellery product to the inventory.
          </Typography>
        </Box>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>

          {/* LEFT COLUMN */}
          <Grid item xs={12} lg={7}>

            {/* Image Upload Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <Card sx={{ borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <SectionHeader icon={<Image size={20} />} title="Product Images" description="Upload up to 4 high-quality images" />
                  <Box
                    component="label"
                    sx={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      p: 4, border: `2px dashed ${BRAND}`, borderRadius: '16px',
                      bgcolor: BRAND_LIGHT, cursor: 'pointer', transition: 'all 0.3s',
                      '&:hover': { bgcolor: '#e0f2fe', borderColor: BRAND_DARK }
                    }}
                  >
                    <Avatar sx={{ bgcolor: '#fff', color: BRAND, width: 56, height: 56, mb: 2, boxShadow: `0 8px 20px ${BRAND}40` }}>
                      <Upload size={24} />
                    </Avatar>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1e293b' }}>Drag & Drop or Click to Upload</Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, mt: 0.5 }}>PNG, JPG, WEBP up to 10MB (max 4 images)</Typography>
                    <input
                      type="file"
                      name="imageUrl"
                      accept="image/*"
                      multiple
                      hidden
                      onChange={(e) => handleChange(e, null, 'imageUrls')}
                    />
                  </Box>

                  {productData.imageUrls.length > 0 && (
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      {productData.imageUrls.map((image, index) => (
                        <Grid item xs={6} sm={3} key={index}>
                          <Box sx={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: `2px solid ${BRAND}40` }}>
                            <img src={image.imageUrl} alt={`Product ${index + 1}`} style={{ width: '100%', height: 100, objectFit: 'cover', display: 'block' }} />
                            <Chip label={`#${index + 1}`} size="small" sx={{ position: 'absolute', top: 6, left: 6, bgcolor: BRAND, color: '#fff', fontWeight: 800, fontSize: '0.65rem', height: 20 }} />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Basic Info Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <Card sx={{ borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <SectionHeader icon={<Package size={20} />} title="Basic Information" description="Core product identity and details" />
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={8}>
                      <StyledTextField label="Product Title" name="title" value={productData.title} onChange={handleChange} fullWidth required />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <StyledTextField label="Brand" name="brand" value={productData.brand} onChange={handleChange} fullWidth required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ fontWeight: 600 }}>Color</InputLabel>
                        <StyledSelect label="Color" name="color" value={productData.color} onChange={handleChange}>
                          <MenuItem value="rose">Rose</MenuItem>
                          <MenuItem value="rose-white">Rose & White</MenuItem>
                          <MenuItem value="white">White</MenuItem>
                          <MenuItem value="yellow">Yellow</MenuItem>
                          <MenuItem value="yellow-rose">Yellow & Rose</MenuItem>
                          <MenuItem value="yellow-white-rose">Yellow White & Rose</MenuItem>
                        </StyledSelect>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField label="Quantity" name="quantity" type="number" value={productData.quantity} onChange={handleChange} fullWidth required />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField label="Description" name="description" value={productData.description} onChange={handleChange} fullWidth multiline rows={3} required />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField label="Details / Specifications" name="details" value={productData.details} onChange={handleChange} fullWidth multiline rows={3} required />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sizes Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
              <Card sx={{ borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <CardContent sx={{ p: 4 }}>
                  <SectionHeader icon={<Layers size={20} />} title="Sizes & Stock" description="Define weight, size, and available stock" />
                  {productData.sizes.map((size, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4}>
                          <StyledTextField label={`Weight ${index + 1}`} name="weight" value={size.weight} onChange={(e) => handleChange(e, index, 'sizes')} fullWidth required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <StyledTextField label={`Size ${index + 1}`} name="size" value={size.size} onChange={(e) => handleChange(e, index, 'sizes')} fullWidth />
                        </Grid>
                        <Grid item xs={9} sm={3}>
                          <StyledTextField label={`Stock ${index + 1}`} name="stock" type="number" value={size.stock} onChange={(e) => handleChange(e, index, 'sizes')} fullWidth />
                        </Grid>
                        <Grid item xs={3} sm={1}>
                          <IconButton onClick={() => handleRemoveSize(index)} disabled={productData.sizes.length === 1} sx={{ color: '#f43f5e', '&:hover': { bgcolor: '#fff1f2' } }}>
                            <Trash2 size={18} />
                          </IconButton>
                        </Grid>
                      </Grid>
                      {index < productData.sizes.length - 1 && <Divider sx={{ mt: 2, borderColor: '#f8fafc' }} />}
                    </Box>
                  ))}
                  <Button
                    onClick={handleAddSize}
                    startIcon={<Plus size={18} />}
                    variant="outlined"
                    sx={{
                      mt: 1, borderRadius: '12px', textTransform: 'none', fontWeight: 800,
                      borderColor: BRAND, color: BRAND, px: 3,
                      '&:hover': { bgcolor: BRAND_LIGHT, borderColor: BRAND_DARK }
                    }}
                  >
                    Add Size Variant
                  </Button>
                </CardContent>
              </Card>
            </motion.div>



            {/* Dimensions Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }}>
              <Card sx={{ borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <SectionHeader icon={<Ruler size={20} />} title="Dimensions" description="Product measurements" />
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ fontWeight: 600 }}>Ring Size</InputLabel>
                        <StyledSelect label="Ring Size" name="ringSize" value={productData.ringSize} onChange={handleChange}>
                          {[...Array(17).keys()].map(i => (
                            <MenuItem key={i} value={(i + 6).toString()}>{(i + 6).toString()}</MenuItem>
                          ))}
                        </StyledSelect>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField label="Total Weight (g)" name="totalWeight" type="number" value={productData.totalWeight} onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <StyledTextField label="Chain Length" name="chainLength" value={productData.chainLength} onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <StyledTextField label="Pendant Size" name="pendantSize" value={productData.pendantSize} onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <StyledTextField label="Dimensions (W/H/T)" name="dimensions" value={productData.dimensions} onChange={handleChange} fullWidth />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* RIGHT COLUMN */}
          <Grid item xs={12} lg={5}>

            {/* Pricing Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <Card sx={{ borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <SectionHeader icon={<DollarSign size={20} />} title="Pricing" description="Set price and discount details" />
                  <Grid container spacing={2.5}>
                    <Grid item xs={12}>
                      <StyledTextField label="Original Price (AED)" name="price" type="number" value={productData.price} onChange={handleChange} fullWidth required />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField label="Discounted Price (AED)" name="discountedPrice" type="number" value={productData.discountedPrice} onChange={handleChange} fullWidth required />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField label="Discount Percentage (%)" name="discountPercent" type="number" value={productData.discountPercent} onChange={handleChange} fullWidth required />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>

            {/* Metal Details Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
              <Card sx={{ borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <SectionHeader icon={<Award size={20} />} title="Metal Details" description="Define metal properties" />
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ fontWeight: 600 }}>Metal Type</InputLabel>
                        <StyledSelect label="Metal Type" name="metalType" value={productData.metalType} onChange={handleChange}>
                          <MenuItem value="Gold">Gold</MenuItem>
                          <MenuItem value="Silver">Silver</MenuItem>
                          <MenuItem value="Platinum">Platinum</MenuItem>
                          <MenuItem value="Rose Gold">Rose Gold</MenuItem>
                          <MenuItem value="White Gold">White Gold</MenuItem>
                        </StyledSelect>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField label="Metal Purity (e.g. 18K, 22K)" name="metalPurity" value={productData.metalPurity} onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField label="Metal Weight (g)" name="metalWeight" type="number" value={productData.metalWeight} onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ fontWeight: 600 }}>Metal Color</InputLabel>
                        <StyledSelect label="Metal Color" name="metalColor" value={productData.metalColor} onChange={handleChange}>
                          <MenuItem value="Yellow Gold">Yellow Gold</MenuItem>
                          <MenuItem value="Rose Gold">Rose Gold</MenuItem>
                          <MenuItem value="White Gold">White</MenuItem>
                        </StyledSelect>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField label="Hallmark / Certification" name="hallmarkCertification" value={productData.hallmarkCertification} onChange={handleChange} fullWidth />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>

            {/* Gemstone Details Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}>
              <Card sx={{ borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <SectionHeader icon={<Gem size={20} />} title="Gemstone Details" description="Information about primary stones" />
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ fontWeight: 600 }}>Stone Type</InputLabel>
                        <StyledSelect label="Stone Type" name="primaryStoneType" value={productData.primaryStoneType} onChange={handleChange}>
                          <MenuItem value="Diamond">Diamond</MenuItem>
                          <MenuItem value="Ruby">Ruby</MenuItem>
                          <MenuItem value="Emerald">Emerald</MenuItem>
                          <MenuItem value="Moissanite">Moissanite</MenuItem>
                          <MenuItem value="Sapphire">Sapphire</MenuItem>
                          <MenuItem value="None">None</MenuItem>
                        </StyledSelect>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ fontWeight: 600 }}>Stone Shape</InputLabel>
                        <StyledSelect label="Stone Shape" name="stoneShape" value={productData.stoneShape} onChange={handleChange}>
                          <MenuItem value="Round">Round</MenuItem>
                          <MenuItem value="Princess">Princess</MenuItem>
                          <MenuItem value="Oval">Oval</MenuItem>
                          <MenuItem value="Pear">Pear</MenuItem>
                          <MenuItem value="Cushion">Cushion</MenuItem>
                          <MenuItem value="None">None</MenuItem>
                        </StyledSelect>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField label="Stone Wt (Carat)" name="stoneWeight" type="number" value={productData.stoneWeight} onChange={handleChange} fullWidth />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>

            {/* Classification Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
              <Card sx={{ borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <SectionHeader icon={<Tag size={20} />} title="Classification" description="Occasion, collection and metal type" />
                  <Grid container spacing={2.5}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ fontWeight: 600 }}>Occasion</InputLabel>
                        <StyledSelect label="Occasion" name="occasion" value={productData.occasion} onChange={handleChange}>
                          <MenuItem value="bridal">Bridal Wear</MenuItem>
                          <MenuItem value="casual">Casual Wear</MenuItem>
                          <MenuItem value="engagement">Engagement</MenuItem>
                          <MenuItem value="modern">Modern Wear</MenuItem>
                          <MenuItem value="office">Office Wear</MenuItem>
                          <MenuItem value="traditional-ethenic">Traditional & Ethnic Wear</MenuItem>
                        </StyledSelect>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ fontWeight: 600 }}>Collection</InputLabel>
                        <StyledSelect label="Collection" name="collectionName" value={productData.collectionName} onChange={handleChange}>
                          <MenuItem value="best-sellers">Best Sellers</MenuItem>
                          <MenuItem value="reccomanded">Recommended</MenuItem>
                          <MenuItem value="new-arrival">New Arrivals</MenuItem>
                          <MenuItem value="dharohar">Dharohar</MenuItem>
                          <MenuItem value="aksharam">Aksharam</MenuItem>
                          <MenuItem value="loupe">Loupe</MenuItem>
                        </StyledSelect>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ fontWeight: 600 }}>Metal Type</InputLabel>
                        <StyledSelect label="Metal Type" name="type" value={productData.type} onChange={handleChange}>
                          <MenuItem value="gold">Gold</MenuItem>
                          <MenuItem value="silver">Silver</MenuItem>
                          <MenuItem value="diamond">Diamond</MenuItem>
                          <MenuItem value="platinum">Platinum</MenuItem>
                          <MenuItem value="gemstone">Gemstone</MenuItem>
                        </StyledSelect>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>

            {/* Category Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
              <Card sx={{ borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <SectionHeader icon={<BarChart3 size={20} />} title="Category Hierarchy" description="Map product into the correct category" />
                  <Grid container spacing={2.5}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ fontWeight: 600 }}>Main Category (Material)</InputLabel>
                        <StyledSelect label="Main Category (Material)" name="topLevelCategory" value={productData.topLevelCategory} onChange={handleChange}>
                          <MenuItem value="gold">Gold Jewelry</MenuItem>
                          <MenuItem value="silver">Silver Jewelry</MenuItem>
                          <MenuItem value="diamond">Diamond Jewelry</MenuItem>
                          <MenuItem value="platinum">Platinum Jewelry</MenuItem>
                          <MenuItem value="gemstone">Gemstone Jewelry</MenuItem>
                        </StyledSelect>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ fontWeight: 600 }}>Product Type (e.g., Rings, Earrings)</InputLabel>
                        <StyledSelect label="Product Type (e.g., Rings, Earrings)" name="secondLevelCategory" value={productData.secondLevelCategory} onChange={handleChange}>
                          <MenuItem value="earrings">Earring</MenuItem>
                          <MenuItem value="rings">Ring</MenuItem>
                          <MenuItem value="nacklaces">Necklace</MenuItem>
                          <MenuItem value="best-sellers">Best Sellers</MenuItem>
                          <MenuItem value="wedding">Wedding</MenuItem>
                          <MenuItem value="other">Others</MenuItem>
                        </StyledSelect>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ fontWeight: 600 }}>Specific Style (e.g., Hoop, Bridal Ring)</InputLabel>
                        <StyledSelect label="Specific Style (e.g., Hoop, Bridal Ring)" name="thirdLevelCategory" value={productData.thirdLevelCategory} onChange={handleChange}>
                          <MenuItem value="bangle">Bangle</MenuItem>
                          <MenuItem value="bracelet">Bracelet</MenuItem>
                          <MenuItem value="chain">Chain</MenuItem>
                          <MenuItem value="earring">Earring</MenuItem>
                          <MenuItem value="mangal-sutra">Mangal Sutra</MenuItem>
                          <MenuItem value="necklace">Necklace</MenuItem>
                          <MenuItem value="pendant">Pendant</MenuItem>
                          <MenuItem value="locket">Locket</MenuItem>
                          <MenuItem value="ring">Ring</MenuItem>
                          <MenuItem value="drop">Drop</MenuItem>
                          <MenuItem value="hoop">Hoop</MenuItem>
                          <MenuItem value="stud">Studs</MenuItem>
                          <MenuItem value="jhumka">Jhumkas</MenuItem>
                          <MenuItem value="engagement-ring">Engagement Ring</MenuItem>
                          <MenuItem value="pearl-ring">Pearl Ring</MenuItem>
                          <MenuItem value="bridal-ring">Bridal Ring</MenuItem>
                          <MenuItem value="couple-ring">Couple Rings</MenuItem>
                        </StyledSelect>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>


          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            {/* Submit Button */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                size="medium"
                sx={{
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 800,
                  fontSize: '1rem',
                  py: 1.2,
                  px: 6,
                  bgcolor: BRAND,
                  boxShadow: `0 8px 25px ${BRAND}60`,
                  letterSpacing: '-0.3px',
                  '&:hover': {
                    bgcolor: BRAND_DARK,
                    boxShadow: `0 12px 30px ${BRAND}80`,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.25s ease',
                }}
              >
                Publish Product to Store
              </Button>
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 1.5, color: '#94a3b8', fontWeight: 600 }}>
                All required fields must be filled before submitting.
              </Typography>
            </motion.div>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateProductForm;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { findProductById, updateProduct } from '../../state/product/Action';

const EditProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);

  const [form, setForm] = useState({
    title: '',
    brand: '',
    color: '',
    discountedPrice: 0,
    price: 0,
    discountPercent: 0,
    description: '',
    details: '',
    occasion: '',
    quantity: 1,
    collectionName: '',
    type: '',
    imageUrls: [],
    sizes: [],
  });

  useEffect(() => {
    dispatch(findProductById({ productId }));
  }, [productId]);

  useEffect(() => {
    if (products.product) {
      const p = products.product;
      setForm({
        title: p.title || '',
        brand: p.brand || '',
        color: p.color || '',
        discountedPrice: p.discountedPrice || 0,
        price: p.price || 0,
        discountPercent: p.discountPercent || 0,
        description: p.description || '',
        details: p.details || '',
        occasion: p.occasion || '',
        quantity: p.quantity || 1,
        collectionName: p.collectionName || '',
        type: p.type || '',
        imageUrls: Array.isArray(p.imageUrls) ? p.imageUrls.map((u) => (typeof u === 'string' ? { imageUrl: u } : u)) : [],
        sizes: Array.isArray(p.sizes) ? p.sizes : [],
      });
    }
  }, [products.product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = async (e) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;
    const selectedFiles = Array.from(files).filter((file) => file.type && file.type.startsWith('image/')).slice(0, 4);
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
      setForm((prev) => ({ ...prev, imageUrls: urls.slice(0, 4).map((u) => ({ imageUrl: u })) }));
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSizeChange = (index, key, value) => {
    setForm((prev) => {
      const updated = [...(prev.sizes || [])];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, sizes: updated };
    });
  };

  const handleAddSize = () => {
    setForm((prev) => ({ ...prev, sizes: [...(prev.sizes || []), { weight: 'g', size: 'MM', stock: 0 }] }));
  };

  const handleRemoveSize = (index) => {
    setForm((prev) => ({ ...prev, sizes: prev.sizes.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const price = Number(form.price) || 0;
    const discountedPrice = Number(form.discountedPrice) || 0;
    const computedDiscount = price > 0 ? Math.max(0, Math.floor(((price - discountedPrice) / price) * 100)) : 0;

    const updates = { ...form, discountPercent: computedDiscount };
    await dispatch(updateProduct({ productId, updates }));
    navigate('/admin/products');
  };

  return (
    <div className='p-10'>
      <Typography variant='h4' sx={{ textAlign: 'center' }} className='py-10'>Edit Product</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type='file'
              name='imageUrl'
              inputProps={{ accept: 'image/*', multiple: true }}
              onChange={handleImagesChange}
              fullWidth
              helperText={'Upload up to 4 images'}
            />
          </Grid>

          {form.imageUrls && form.imageUrls.length > 0 && (
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {form.imageUrls.map((image, index) => (
                  <Grid item xs={6} sm={3} key={`${image.imageUrl}-${index}`}>
                    <img
                      src={image.imageUrl}
                      alt={`Image ${index + 1}`}
                      style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8 }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <TextField label='Title' name='title' value={form.title} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label='Brand' name='brand' value={form.brand} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label='Price' name='price' type='number' value={form.price} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label='Discounted Price' name='discountedPrice' type='number' value={form.discountedPrice} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label='Discount %' name='discountPercent' type='number' value={form.discountPercent} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Description' name='description' value={form.description} onChange={handleChange} fullWidth multiline rows={3} />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Details' name='details' value={form.details} onChange={handleChange} fullWidth multiline rows={3} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label='Color' name='color' value={form.color} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label='Type' name='type' value={form.type} onChange={handleChange} fullWidth />
          </Grid>

          {/* Sizes editing */}
          {Array.isArray(form.sizes) && form.sizes.map((s, idx) => (
            <Grid container item spacing={2} key={idx} className='mb-2'>
              <Grid item xs={12} sm={4}>
                <TextField label={`Weight ${idx + 1}`} value={s.weight} onChange={(e) => handleSizeChange(idx, 'weight', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label={`Size ${idx + 1}`} value={s.size} onChange={(e) => handleSizeChange(idx, 'size', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label={`Stock ${idx + 1}`} type='number' value={s.stock} onChange={(e) => handleSizeChange(idx, 'stock', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} sm={1}>
                <Button color='error' variant='outlined' onClick={() => handleRemoveSize(idx)}>Remove</Button>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button onClick={handleAddSize} variant='outlined'>Add Size</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' type='submit'>Save Changes</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EditProductForm;



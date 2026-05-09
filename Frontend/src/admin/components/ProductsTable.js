import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  Card,
  CardHeader,
  Divider,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { store } from "../../state/store";
import { deleteProduct, findProducts } from "../../state/product/Action";

const ProductsTable = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);
  const navigate = useNavigate();

  const handleProductDelete = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete));
      setProductToDelete(null);
    }
  };

  useEffect(() => {
    const data = {
      category: "jewellery",
      color: [],
      minPrice: 0,
      maxPrice: 1000000,
      minDiscount: 0,
      maxDiscount: 100,
      sort: "low_to_high",
      pageNumber: 1,
      pageSize: 100,
      occasion: [],
      type: [],
      collectionName: "",
    };
    dispatch(findProducts(data));
  }, [products?.deletedProduct, products?.updatedProduct]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <CardHeader
          title="Product Inventory"
          subheader={`Total ${products.products?.content?.length || 0} products available`}
          titleTypographyProps={{ fontWeight: 800 }}
        />
        <Divider />
        <TableContainer component={Box} sx={{ overflowX: 'auto', width: '100%' }}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead sx={{ bgcolor: 'var(--bg-premium)' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Material & Stones</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Specs & Stock</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Pricing</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.products?.content?.map((item, index) => (
                <TableRow
                  key={item._id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        variant="rounded"
                        sx={{ width: 48, height: 48, mr: 2, borderRadius: '10px' }}
                        src={item.imageUrls?.[0]?.imageUrl}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                        {item.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, alignItems: 'flex-start' }}>
                      <Chip
                        label={item.category?.name || "General"}
                        size="small"
                        sx={{ textTransform: 'capitalize', fontWeight: 600, bgcolor: 'var(--bg-premium)', color: 'var(--primary-blue)' }}
                      />
                      {item.color && (
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          {(Array.isArray(item.color) ? item.color : [item.color]).map(c => (
                            <Chip key={c} label={c} size="small" variant="outlined" sx={{ fontSize: '0.65rem', height: 18, textTransform: 'capitalize' }} />
                          ))}
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      {item.metalType && (
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#1e293b' }}>
                          {item.metalPurity ? `${item.metalPurity} ` : ''}{item.metalColor || item.metalType}
                        </Typography>
                      )}
                      {item.primaryStoneType && item.primaryStoneType !== "None" && (
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                          {item.primaryStoneType} {item.stoneWeight ? `(${item.stoneWeight}ct)` : ''}
                        </Typography>
                      )}
                      {!item.metalType && !item.primaryStoneType && (
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>-</Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                      {(item.ringSize || item.chainLength) && (
                        <Chip size="small" label={`Size: ${item.ringSize || item.chainLength}`} sx={{ bgcolor: '#f0f9ff', color: '#0369a1', fontWeight: 600, height: 22 }} />
                      )}
                      <Chip
                        size="small"
                        label={`Qty: ${item.quantity || 0}`}
                        sx={{
                          bgcolor: (item.quantity > 5) ? '#ecfdf5' : '#fef2f2',
                          color: (item.quantity > 5) ? '#047857' : '#be123c',
                          fontWeight: 700,
                          height: 22
                        }}
                      />
                      {item.totalWeight && (
                        <Chip size="small" label={`${item.totalWeight}g`} variant="outlined" sx={{ fontWeight: 600, height: 22, color: '#64748b' }} />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '80px' }}>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: '#0f172a' }}>
                        ₹{item.discountedPrice?.toLocaleString() || 0}
                      </Typography>
                      {item.price > item.discountedPrice && (
                        <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#94a3b8', fontWeight: 600 }}>
                          ₹{item.price?.toLocaleString()}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          sx={{ color: 'var(--primary-gold)' }}
                          onClick={() => setSelectedProduct(item)}
                        >
                          <Eye size={18} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Product">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => navigate(`/admin/product/edit/${item._id}`)}
                        >
                          <Edit2 size={18} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Product">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setProductToDelete(item._id)}
                        >
                          <Trash2 size={18} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: '24px', overflow: 'hidden' } }}
      >
        {selectedProduct && (
          <>
            <DialogTitle sx={{ bgcolor: 'var(--bg-premium)', borderBottom: '1px solid #f1f5f9', p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>{selectedProduct.title}</Typography>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>Brand: {selectedProduct.brand}</Typography>
                </Box>
                <Chip label={selectedProduct.category?.name || 'General'} sx={{ bgcolor: '#e0f2fe', color: '#0369a1', fontWeight: 700 }} />
              </Box>
            </DialogTitle>
            <DialogContent sx={{ p: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={5}>
                  <Box sx={{ width: '100%', height: 320, borderRadius: '16px', overflow: 'hidden', bgcolor: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {selectedProduct.imageUrls?.[0]?.imageUrl ? (
                      <img src={selectedProduct.imageUrls[0].imageUrl} alt={selectedProduct.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Typography sx={{ color: '#94a3b8' }}>No Image</Typography>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, mt: 2, overflowX: 'auto' }}>
                    {selectedProduct.imageUrls?.map((img, i) => (
                      <Box key={i} sx={{ width: 60, height: 60, borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                        <img src={img.imageUrl} alt={`view-${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Box>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 1, mb: 1 }}>Details & Specs</Typography>
                  <Typography variant="body2" sx={{ color: '#475569', mb: 3, lineHeight: 1.6 }}>{selectedProduct.description}</Typography>

                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
                    <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: '12px' }}>
                      <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>Metal Details</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b' }}>{selectedProduct.metalPurity} {selectedProduct.metalColor || selectedProduct.metalType}</Typography>
                      <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>Weight: {selectedProduct.metalWeight}g | Hallmark: {selectedProduct.hallmarkCertification}</Typography>
                    </Box>
                    <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: '12px' }}>
                      <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>Gemstone Details</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b' }}>{selectedProduct.primaryStoneType !== 'None' ? selectedProduct.primaryStoneType : 'No Stone'}</Typography>
                      <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>Shape: {selectedProduct.stoneShape} | Weight: {selectedProduct.stoneWeight}ct</Typography>
                    </Box>
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: 1, mb: 1 }}>Inventory & Pricing</Typography>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a' }}>₹{selectedProduct.discountedPrice?.toLocaleString()}</Typography>
                    {selectedProduct.price > selectedProduct.discountedPrice && (
                      <Typography variant="h6" sx={{ textDecoration: 'line-through', color: '#94a3b8', fontWeight: 600 }}>₹{selectedProduct.price?.toLocaleString()}</Typography>
                    )}
                  </Box>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip label={`Stock: ${selectedProduct.quantity}`} sx={{ bgcolor: selectedProduct.quantity > 5 ? '#ecfdf5' : '#fef2f2', color: selectedProduct.quantity > 5 ? '#047857' : '#be123c', fontWeight: 800 }} />
                    {selectedProduct.ringSize && <Chip variant="outlined" label={`Ring Size: ${selectedProduct.ringSize}`} />}
                    {selectedProduct.chainLength && <Chip variant="outlined" label={`Chain Length: ${selectedProduct.chainLength}`} />}
                    {selectedProduct.totalWeight && <Chip variant="outlined" label={`Total Weight: ${selectedProduct.totalWeight}g`} />}
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3, bgcolor: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
              <Button onClick={() => setSelectedProduct(null)} sx={{ color: '#64748b', fontWeight: 700 }}>Close</Button>
              <Button
                variant="contained"
                startIcon={<Edit2 size={16} />}
                onClick={() => {
                  navigate(`/admin/product/edit/${selectedProduct._id}`);
                  setSelectedProduct(null);
                }}
                sx={{ bgcolor: 'var(--primary-gold)', color: '#fff', fontWeight: 800, '&:hover': { bgcolor: '#b48600' } }}
              >
                Edit Product
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Dialog open={!!productToDelete} onClose={() => setProductToDelete(null)} PaperProps={{ sx: { borderRadius: '16px' } }}>
        <DialogTitle sx={{ fontWeight: 800 }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontWeight: 600, color: '#475569', mt: 1 }}>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setProductToDelete(null)} sx={{ color: '#64748b', fontWeight: 700 }}>
            Cancel
          </Button>
          <Button onClick={handleProductDelete} color="error" variant="contained" sx={{ fontWeight: 700, borderRadius: '8px' }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default ProductsTable;

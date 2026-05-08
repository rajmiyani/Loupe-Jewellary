import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Button
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../../state/product/Action";
import { Eye, Trash2, Calendar, Filter } from "lucide-react";

const ProductsTableView = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);

  useEffect(() => {
    const data = {
      category: "jewellery",
      color: [],
      minPrice: 0,
      maxPrice: 1000000,
      minDiscount: 0,
      maxDiscount: 100,
      sort: "high_to_low",
      pageNumber: 1,
      pageSize: 5,
      occasion: [],
      type: [],
    };
    dispatch(findProducts(data));
  }, [dispatch]);

  const recentProducts = products.products?.content?.slice(0, 5) || [];

  return (
    <Card sx={{ borderRadius: '24px', boxShadow: '0 4px 25px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9', bgcolor: '#ffffff' }}>
      <Box sx={{ p: 3.5, borderBottom: '1px solid #f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, color: '#1e293b', letterSpacing: '-0.5px' }}>Top Selling Products</Typography>
            <Box sx={{ px: 1.5, py: 0.4, borderRadius: '8px', bgcolor: '#ecfdf5', color: '#10b981', fontSize: '0.7rem', fontWeight: 800 }}>TRENDING</Box>
          </Box>
          <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>Analyzing highest performing inventory</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button variant="outlined" startIcon={<Filter size={16} />} sx={{ borderRadius: '12px', textTransform: 'none', px: 2, borderColor: '#f1f5f9', color: '#64748b', fontWeight: 700, '&:hover': { borderColor: '#97c2d5', bgcolor: 'transparent' } }}>Filters</Button>
          <Button variant="contained" sx={{ borderRadius: '12px', textTransform: 'none', px: 2, bgcolor: '#111827', color: '#ffffff', fontWeight: 700, boxShadow: '0 10px 20px rgba(0,0,0,0.1)', '&:hover': { bgcolor: '#1f2937' } }}>Inventory</Button>
        </Box>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#fbfcfd' }}>
              <TableCell sx={{ color: '#64748b', fontWeight: 900, fontSize: '0.7rem', py: 2.5, px: 3.5, letterSpacing: '1px' }}>PRODUCT IDENTITY</TableCell>
              <TableCell sx={{ color: '#64748b', fontWeight: 900, fontSize: '0.7rem', py: 2.5, px: 3.5, letterSpacing: '1px' }}>CATEGORY</TableCell>
              <TableCell sx={{ color: '#64748b', fontWeight: 900, fontSize: '0.7rem', py: 2.5, px: 3.5, letterSpacing: '1px' }}>MARKET PRICE</TableCell>
              <TableCell sx={{ color: '#64748b', fontWeight: 900, fontSize: '0.7rem', py: 2.5, px: 3.5, letterSpacing: '1px' }}>INVENTORY</TableCell>
              <TableCell align="right" sx={{ color: '#64748b', fontWeight: 900, fontSize: '0.7rem', py: 2.5, px: 3.5, letterSpacing: '1px' }}>CONTROL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentProducts.map((item) => (
              <TableRow key={item._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar variant="rounded" src={item.imageUrls?.[0].imageUrl} sx={{ width: 40, height: 40, borderRadius: '10px' }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1e293b', textTransform: 'capitalize' }}>{item.title}</Typography>
                      <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>ID: {item._id.slice(-6).toUpperCase()}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#64748b', textTransform: 'capitalize' }}>{item.category.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1e293b' }}>AED {item.discountedPrice?.toLocaleString()}</Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{
                    display: 'inline-block',
                    px: 1.5, py: 0.5,
                    borderRadius: '6px',
                    bgcolor: '#f0fdf4',
                    color: '#10b981',
                    fontWeight: 700,
                    fontSize: '0.75rem'
                  }}>
                    In Stock
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <IconButton size="small" sx={{ color: '#94a3b8' }}><Eye size={18} /></IconButton>
                    <IconButton size="small" sx={{ color: '#94a3b8' }}><Trash2 size={18} /></IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default ProductsTableView;

import React, { useEffect } from "react";
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
  Tooltip
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { store } from "../../state/store";
import { deleteProduct, findProducts } from "../../state/product/Action";

const ProductsTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);
  const navigate = useNavigate();

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
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
        <TableContainer component={Box}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead sx={{ bgcolor: 'var(--bg-premium)' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
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
                    <Chip
                      label={item.category?.name}
                      size="small"
                      sx={{ textTransform: 'capitalize', fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'var(--primary-burgundy)' }}>
                      ₹{item.discountedPrice}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ textTransform: 'capitalize', opacity: 0.8 }}>
                      {item.type}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          sx={{ color: 'var(--primary-gold)' }}
                          onClick={() => navigate(`/product/${item._id}`)}
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
                          onClick={() => handleProductDelete(item._id)}
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
    </motion.div>
  );
};

export default ProductsTable;

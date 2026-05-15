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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../state/admin/order/Action";
import { Globe, ShoppingBag, Eye, Trash2, Filter } from "lucide-react";
import { useDashboard } from "../components/AdminDashboard";

const OrdersTableView = () => {
  const dispatch = useDispatch();
  const { adminOrder } = useSelector((store) => store);
  const { searchQuery, statusFilter, selectedMonth, selectedYear } = useDashboard();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  // Apply filters
  const filteredOrders = (adminOrder?.orders || []).filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.orderStatus?.toLowerCase() === statusFilter;
    const matchesSearch = !searchQuery ||
      `${order.user?.firstName} ${order.user?.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order._id?.toLowerCase().includes(searchQuery.toLowerCase());
    const orderDate = order.createdAt ? new Date(order.createdAt) : null;
    const matchesMonth = selectedMonth === '' || (orderDate && orderDate.getMonth() === parseInt(selectedMonth));
    const matchesYear = !orderDate || orderDate.getFullYear() === parseInt(selectedYear);
    return matchesStatus && matchesSearch && matchesMonth && matchesYear;
  }).slice(0, 5);

  const recentOrders = filteredOrders;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return { bg: '#fef3c7', text: '#d97706' }; // Confirmed
      case 'shipped': return { bg: '#e0e7ff', text: '#4338ca' };   // Shipped
      case 'delivered': return { bg: '#f0fdf4', text: '#10b981' }; // Delivered
      case 'placed': return { bg: '#fffbeb', text: '#d4af37' };    // Placed
      case 'cancelled': return { bg: '#fff1f2', text: '#f43f5e' }; // Cancelled
      default: return { bg: '#f8fafc', text: '#64748b' };
    }
  };

  return (
    <Card sx={{ borderRadius: '24px', boxShadow: '0 4px 25px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9', bgcolor: '#ffffff' }}>
      <Box sx={{ p: 4, borderBottom: '1px solid #f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 900, color: '#111827', letterSpacing: '-0.5px' }}>Latest Orders</Typography>
          <Box sx={{ px: 1.5, py: 0.5, borderRadius: '8px', bgcolor: '#f0f9ff', color: '#755970', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.5px' }}>LIVE</Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button variant="outlined" startIcon={<Filter size={16} />} sx={{ borderRadius: '12px', textTransform: 'none', px: 2.5, borderColor: '#f1f5f9', color: '#64748b', fontWeight: 800, '&:hover': { borderColor: '#755970', bgcolor: 'transparent' } }}>Filters</Button>
          {/* <Button variant="contained" sx={{ borderRadius: '12px', textTransform: 'none', px: 2.5, bgcolor: '#111827', color: '#ffffff', fontWeight: 800, boxShadow: '0 10px 20px rgba(0,0,0,0.1)', '&:hover': { bgcolor: '#1f2937' } }}></Button> */}
        </Box>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#fbfcfd' }}>
              <TableCell sx={{ color: '#94a3b8', fontWeight: 900, fontSize: '0.65rem', py: 2.5, px: 4, letterSpacing: '1.2px', textTransform: 'uppercase' }}>Source Details</TableCell>
              <TableCell sx={{ color: '#94a3b8', fontWeight: 900, fontSize: '0.65rem', py: 2.5, px: 3.5, letterSpacing: '1.2px', textTransform: 'uppercase' }}>Customer Analytics</TableCell>
              <TableCell sx={{ color: '#94a3b8', fontWeight: 900, fontSize: '0.65rem', py: 2.5, px: 3.5, letterSpacing: '1.2px', textTransform: 'uppercase' }}>Net Revenue</TableCell>
              <TableCell sx={{ color: '#94a3b8', fontWeight: 900, fontSize: '0.65rem', py: 2.5, px: 3.5, letterSpacing: '1.2px', textTransform: 'uppercase' }}>Order Status</TableCell>
              <TableCell align="right" sx={{ color: '#94a3b8', fontWeight: 900, fontSize: '0.65rem', py: 2.5, px: 4, letterSpacing: '1.2px', textTransform: 'uppercase' }}>Management</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentOrders.map((order) => {
              const statusStyle = getStatusColor(order.orderStatus);
              const isWebsite = Math.random() > 0.5; // Mocking source for design
              return (
                <TableRow key={order._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar variant="rounded" sx={{ bgcolor: isWebsite ? '#f0fdf4' : '#f8fafc', color: isWebsite ? '#10b981' : '#1e1e1e', width: 32, height: 32 }}>
                        {isWebsite ? <Globe size={16} /> : <ShoppingBag size={16} />}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b' }}>{isWebsite ? 'Website' : 'On Shop'}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1e293b' }}>
                        {order.user?.firstName} {order.user?.lastName}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                        {order.user?.email}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1e293b' }}>
                      AED {order.totalPrice?.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{
                      display: 'inline-block',
                      px: 1.5, py: 0.5,
                      borderRadius: '6px',
                      bgcolor: statusStyle.bg,
                      color: statusStyle.text,
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize'
                    }}>
                      {order.orderStatus}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <IconButton size="small" sx={{ color: '#94a3b8' }}><Eye size={18} /></IconButton>
                      <IconButton size="small" sx={{ color: '#94a3b8' }}><Trash2 size={18} /></IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default OrdersTableView;

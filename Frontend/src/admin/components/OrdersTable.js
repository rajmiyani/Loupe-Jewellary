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
  AvatarGroup,
  Button,
  Card,
  CardHeader,
  Divider,
  Menu,
  MenuItem,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronDown,
  CheckCircle2,
  Truck,
  ThumbsUp,
  Trash2,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { store } from "../../state/store";
import { confirmedOrder, deleteOrder, deliveredOrder, getOrders, shippedOrder } from '../../state/admin/order/Action';

const statusConfig = {
  PLACED: { label: 'Placed', color: 'info', icon: Clock },
  CONFIRMED: { label: 'Confirmed', color: 'success', icon: ThumbsUp },
  SHIPPED: { label: 'Shipped', color: 'primary', icon: Truck },
  DELIVERED: { label: 'Delivered', color: 'secondary', icon: CheckCircle2 },
  PENDING: { label: 'Pending', color: 'warning', icon: Clock },
};

const OrdersTable = () => {
  const [anchorEl, setAnchorEl] = React.useState({});
  const dispatch = useDispatch();
  const { adminOrder } = useSelector(store => store);

  const handleClick = (event, id) => {
    setAnchorEl({ ...anchorEl, [id]: event.currentTarget });
  };

  const handleClose = (id) => {
    setAnchorEl({ ...anchorEl, [id]: null });
  };

  useEffect(() => {
    dispatch(getOrders());
  }, [adminOrder.confirmed, adminOrder.shipped, adminOrder.delivered, adminOrder.deletedOrder]);

  const handleStatusUpdate = (handler, orderId, id) => {
    dispatch(handler(orderId));
    handleClose(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <CardHeader
          title="Customer Orders"
          subheader={`Total ${adminOrder.orders?.length || 0} orders received`}
          titleTypographyProps={{ fontWeight: 800 }}
        />
        <Divider />
        <TableContainer>
          <Table sx={{ minWidth: 900 }}>
            <TableHead sx={{ bgcolor: 'var(--bg-premium)' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Items</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Total Price</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Update Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder.orders?.map((item) => {
                const status = statusConfig[item.orderStatus] || { label: item.orderStatus, color: 'default', icon: Clock };
                const StatusIcon = status.icon;

                return (
                  <TableRow key={item._id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AvatarGroup max={3} sx={{ mr: 2 }}>
                          {item.orderItems?.map((orderItem, idx) => (
                            <Avatar
                              key={idx}
                              sx={{ width: 40, height: 40 }}
                              src={orderItem.product?.imageUrls?.[0]?.imageUrl}
                            />
                          ))}
                        </AvatarGroup>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {item.orderItems?.length} {item.orderItems?.length === 1 ? 'Item' : 'Items'}
                          </Typography>
                          <Typography variant="caption" color="textSecondary" noWrap sx={{ maxWidth: 200, display: 'block' }}>
                            {item.orderItems?.map(oi => oi.product?.title).join(", ")}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {item.user?.firstName} {item.user?.lastName}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        {item.user?.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'var(--primary-burgundy)' }}>
                        ₹{item.totalPrice}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'green', fontWeight: 600 }}>
                        {item.discount}% Off
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={<StatusIcon size={14} />}
                        label={status.label}
                        color={status.color}
                        size="small"
                        sx={{ fontWeight: 600, px: 1 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={(e) => handleClick(e, item._id)}
                        endIcon={<ChevronDown size={16} />}
                        sx={{ borderRadius: '8px', textTransform: 'none' }}
                      >
                        Status
                      </Button>
                      <Menu
                        anchorEl={anchorEl[item._id]}
                        open={Boolean(anchorEl[item._id])}
                        onClose={() => handleClose(item._id)}
                        PaperProps={{
                          sx: {
                            borderRadius: '12px',
                            mt: 1,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            minWidth: 160
                          }
                        }}
                      >
                        <MenuItem onClick={() => handleStatusUpdate(confirmedOrder, item._id, item._id)} sx={{ gap: 1 }}>
                          <ThumbsUp size={16} color="#10b981" /> Confirmed
                        </MenuItem>
                        <MenuItem onClick={() => handleStatusUpdate(shippedOrder, item._id, item._id)} sx={{ gap: 1 }}>
                          <Truck size={16} color="#3b82f6" /> Shipped
                        </MenuItem>
                        <MenuItem onClick={() => handleStatusUpdate(deliveredOrder, item._id, item._id)} sx={{ gap: 1 }}>
                          <CheckCircle2 size={16} color="#8b5cf6" /> Delivered
                        </MenuItem>
                      </Menu>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Delete Order">
                        <IconButton color="error" onClick={() => dispatch(deleteOrder(item._id))}>
                          <Trash2 size={18} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </motion.div>
  );
};

export default OrdersTable;

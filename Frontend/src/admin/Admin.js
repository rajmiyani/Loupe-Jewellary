import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  PlusSquare,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Search,
  Bell,
  Calendar,
  MessageCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import {
  Avatar,
  Box,
  CssBaseline,
  Tooltip,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon
} from "@mui/material";

import ProductsTable from "./components/ProductsTable";
import CustomersTable from "./components/CustomersTable";
import OrdersTable from "./components/OrdersTable";
import CreateProductForm from "./components/CreateProductForm";
import EditProductForm from "./components/EditProductForm";
import AdminDashboard from "./components/AdminDashboard";
import { getOrders } from "../state/admin/order/Action";

const menu = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  {
    name: "Orders",
    icon: ShoppingBag,
    hasSub: true,
    subItems: [
      { name: "Order Booked", path: "/admin/orders?status=booked" },
      { name: "Complete Order", path: "/admin/orders?status=completed" },
      { name: "Cancel Order", path: "/admin/orders?status=cancelled" }
    ]
  },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Customers", path: "/admin/customers", icon: Users },
  { name: "Add Product", path: "/admin/product/create", icon: PlusSquare },
];

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({});
  const [anchorElNotify, setAnchorElNotify] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { auth, adminOrder } = useSelector(store => store);

  useEffect(() => {
    dispatch(getOrders());
    const interval = setInterval(() => dispatch(getOrders()), 300000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleOpenNotify = (event) => setAnchorElNotify(event.currentTarget);
  const handleCloseNotify = () => setAnchorElNotify(null);

  const toggleSubMenu = (name) => {
    setOpenSubMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleMenuClick = (item) => {
    if (item.hasSub) {
      toggleSubMenu(item.name);
    } else {
      navigate(item.path);
    }
  };

  const sidebarWidth = collapsed ? 80 : 280;
  const recentOrders = adminOrder?.orders?.slice(0, 5) || [];
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <CssBaseline />

      {/* Sidebar */}
      <Box
        sx={{
          width: sidebarWidth,
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          bgcolor: 'white',
          color: '#1e293b',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          height: '100vh',
          zIndex: 1200,
          borderRight: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '4px 0 20px rgba(0,0,0,0.02)'
        }}
      >
        {/* Logo Section */}
        <Box sx={{
          p: 3,
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
        }}>
          {!collapsed && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{
                width: 40, height: 40, bgcolor: '#97c2d5', borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(151, 194, 213, 0.3)'
              }}>
                <Typography variant="h6" fontWeight="900" sx={{ color: 'white' }}>L</Typography>
              </Box>
              <Typography variant="h5" fontWeight="900" sx={{ letterSpacing: 1, color: '#111827', fontFamily: 'serif' }}>
                Loupe
              </Typography>
            </Box>
          )}
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            sx={{ color: '#94a3b8', '&:hover': { color: '#97c2d5' } }}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </IconButton>
        </Box>

        {/* Menu Items */}
        <Box sx={{ flexGrow: 1, px: 2, mt: 2, overflowY: 'auto' }}>
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            const isSubOpen = openSubMenus[item.name];
            const Icon = item.icon;

            return (
              <Box key={item.name} sx={{ mb: 1 }}>
                <Tooltip title={collapsed ? item.name : ""} placement="right">
                  <Box
                    onClick={() => handleMenuClick(item)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 1.8,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      bgcolor: isActive ? '#e0f2f1' : 'transparent', // Using a light version of the brand blue
                      color: isActive ? '#97c2d5' : '#64748b',
                      '&:hover': {
                        bgcolor: isActive ? '#e0f2f1' : '#f8f9fa',
                        color: isActive ? '#97c2d5' : '#111827',
                        transform: 'translateX(4px)'
                      }
                    }}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    {!collapsed && (
                      <>
                        <Typography sx={{ ml: 2, fontWeight: isActive ? 700 : 500, fontSize: '0.9rem', flexGrow: 1 }}>
                          {item.name}
                        </Typography>
                        {item.hasSub && (isSubOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                      </>
                    )}
                  </Box>
                </Tooltip>

                {!collapsed && item.hasSub && isSubOpen && (
                  <Box sx={{ mt: 1, ml: 4, borderLeft: '2px solid #f1f5f9' }}>
                    {item.subItems.map((sub) => (
                      <Box
                        key={sub.name}
                        onClick={() => navigate(sub.path)}
                        sx={{
                          p: 1.5,
                          pl: 3,
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: '#94a3b8',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          transition: 'all 0.2s',
                          '&:hover': { color: '#97c2d5', bgcolor: '#f0f9ff' }
                        }}
                      >
                        {sub.name}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>

        <Box sx={{ p: 2, borderTop: '1px solid #f1f5f9' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, bgcolor: '#f8fafc', borderRadius: '12px' }}>
            <IconButton size="small"><LogOut size={18} /></IconButton>
            <Box sx={{ width: 40, height: 20, bgcolor: '#e2e8f0', borderRadius: '10px', position: 'relative' }}>
              <Box sx={{ position: 'absolute', left: 2, top: 2, width: 16, height: 16, bgcolor: 'white', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, ml: `${sidebarWidth}px`, transition: 'margin 0.3s' }}>
        <Box sx={{
          height: '100px',
          bgcolor: 'white',
          px: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f1f5f9'
        }}>
          <Box sx={{ position: 'relative', width: 400 }}>
            <Search size={20} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search .."
              style={{
                width: '100%',
                padding: '14px 14px 14px 55px',
                borderRadius: '12px',
                border: 'none',
                background: '#f8fafc',
                fontSize: '0.9rem',
                outline: 'none',
                color: '#1e293b'
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748b' }}>
              <Calendar size={18} />
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{currentDate}</Typography>
            </Box>
            <IconButton onClick={handleOpenNotify} sx={{ bgcolor: '#f8fafc', p: 1.5 }}>
              <Badge badgeContent={recentOrders.length} color="primary" overlap="circular" sx={{ '& .MuiBadge-badge': { bgcolor: '#97c2d5' } }}>
                <Bell size={20} />
              </Badge>
            </IconButton>

            <Menu
              anchorEl={anchorElNotify}
              open={Boolean(anchorElNotify)}
              onClose={handleCloseNotify}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  borderRadius: '16px',
                  width: 320,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  border: '1px solid #f1f5f9'
                }
              }}
            >
              <Box sx={{ p: 2, borderBottom: '1px solid #f1f5f9' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Notifications</Typography>
              </Box>
              {recentOrders.map((order) => (
                <MenuItem key={order._id} onClick={() => { navigate('/admin/orders'); handleCloseNotify(); }} sx={{ py: 1.5 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#e0f2f1', color: '#97c2d5' }}>
                      <ShoppingBag size={16} />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="body2" sx={{ fontWeight: 700 }}>New Order #{order._id.slice(-6).toUpperCase()}</Typography>}
                    secondary={<Typography variant="caption" sx={{ color: '#94a3b8' }}>AED {order.totalPrice} • {order.user?.firstName}</Typography>}
                  />
                </MenuItem>
              ))}
              {recentOrders.length === 0 && (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>No new notifications</Typography>
                </Box>
              )}
            </Menu>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ textAlign: 'right' }}>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 800, color: '#111827' }}>{auth.user?.firstName} {auth.user?.lastName}</Typography>
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Administrator</Typography>
              </Box>
              <Avatar sx={{ width: 45, height: 45, borderRadius: '12px', bgcolor: '#97c2d5' }}>
                {auth.user?.firstName?.charAt(0)}
              </Avatar>
            </Box>
          </Box>
        </Box>

        <Box sx={{ p: 6 }}>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/products" element={<ProductsTable />} />
            <Route path="/customers" element={<CustomersTable />} />
            <Route path="/orders" element={<OrdersTable />} />
            <Route path="/product/create" element={<CreateProductForm />} />
            <Route path="/product/edit/:productId" element={<EditProductForm />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;

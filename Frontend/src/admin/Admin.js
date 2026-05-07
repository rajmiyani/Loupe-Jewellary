import React, { useState } from "react";
import { Link, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  PlusSquare,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User as UserIcon
} from "lucide-react";
import {
  Avatar,
  Box,
  CssBaseline,
  Tooltip,
  IconButton,
  Typography
} from "@mui/material";

import ProductsTable from "./components/ProductsTable";
import CustomersTable from "./components/CustomersTable";
import OrdersTable from "./components/OrdersTable";
import CreateProductForm from "./components/CreateProductForm";
import EditProductForm from "./components/EditProductForm";
import AdminDashboard from "./components/AdminDashboard";
import { store } from "../state/store";

const menu = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Customers", path: "/admin/customers", icon: Users },
  { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
  { name: "Add Product", path: "/admin/product/create", icon: PlusSquare },
];

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useSelector(store => store);

  const sidebarWidth = collapsed ? 80 : 260;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'var(--bg-premium)' }}>
      <CssBaseline />

      {/* Sidebar */}
      <Box
        sx={{
          width: sidebarWidth,
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          bgcolor: 'var(--primary-blue)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          height: '100vh',
          zIndex: 1200,
          boxShadow: '4px 0 24px rgba(0,0,0,0.1)'
        }}
      >
        {/* Logo Section */}
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between' }}>
          {!collapsed && (
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h5" fontWeight="bold" sx={{ letterSpacing: 1, color: 'var(--primary-gold)' }}>
                LOUPE
              </Typography>
            </Link>
          )}
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'white' } }}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </IconButton>
        </Box>

        {/* Menu Items */}
        <Box sx={{ flexGrow: 1, px: 2, mt: 2 }}>
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Tooltip key={item.name} title={collapsed ? item.name : ""} placement="right">
                <Box
                  onClick={() => navigate(item.path)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 1.5,
                    mb: 1,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    bgcolor: isActive ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                    color: isActive ? 'var(--primary-gold)' : 'rgba(255,255,255,0.7)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.05)',
                      color: 'white'
                    }
                  }}
                >
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  {!collapsed && (
                    <Typography sx={{ ml: 2, fontWeight: isActive ? 600 : 400, fontSize: '0.95rem' }}>
                      {item.name}
                    </Typography>
                  )}
                </Box>
              </Tooltip>
            );
          })}
        </Box>

        {/* User Section */}
        <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            p: 1,
            borderRadius: '12px',
            bgcolor: 'rgba(255,255,255,0.05)'
          }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: 'var(--primary-gold)',
                color: 'var(--primary-blue)',
                fontWeight: 'bold'
              }}
            >
              {auth.user?.firstName?.charAt(0).toUpperCase()}
            </Avatar>
            {!collapsed && (
              <Box sx={{ ml: 1.5, overflow: 'hidden' }}>
                <Typography variant="body2" fontWeight="bold" noWrap>
                  {auth.user?.firstName} {auth.user?.lastName}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.6 }} noWrap>
                  Administrator
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${sidebarWidth}px`,
          transition: 'margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          minHeight: '100vh',
          p: 4
        }}
      >
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
  );
};

export default Admin;

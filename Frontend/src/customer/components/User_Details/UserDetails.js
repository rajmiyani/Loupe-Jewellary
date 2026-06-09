import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Divider, Button, Grid } from '@mui/material';
import { User, Heart, Package, Headset, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../state/auth/Action";

import MyAccount from './MyAccount';
import WishList from './WishList';
import ContactUs from './ContactUs';
import OrderHistory from '../MyOrders/OrderHistory';

const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const querySearch = new URLSearchParams(location.search);
  const layout = querySearch.get("layout") || "0";
  const [activeTab, setActiveTab] = useState(parseInt(layout));

  useEffect(() => {
    setActiveTab(parseInt(layout));
  }, [layout]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    window.location.reload();
  };

  const menuItems = [
    { name: 'My Account', icon: <User size={18} />, id: 0 },
    { name: 'Wish List', icon: <Heart size={18} />, id: 1 },
    { name: 'My Orders', icon: <Package size={18} />, id: 2 },
    { name: 'Contact Us', icon: <Headset size={18} />, id: 3 },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', py: { xs: 3, md: 6 }, px: { xs: 2, md: 6 } }}>
      <div className="max-w-6xl mx-auto">
        <Grid container spacing={4}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                bgcolor: 'white',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                position: 'sticky',
                top: 120,
              }}
            >
              {/* User Info */}
              <Box sx={{ p: 3, borderBottom: '1px solid #f1f5f9' }}>
                <Box sx={{
                  width: 56, height: 56, borderRadius: '50%',
                  bgcolor: '#3c7399', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem', fontWeight: 700, mb: 2
                }}>
                  {auth.user?.firstName?.[0]}
                </Box>
                <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#3c7399' }}>
                  {auth.user?.firstName} {auth.user?.lastName}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {auth.user?.email}
                </Typography>
              </Box>

              {/* Menu Items */}
              <Box sx={{ p: 1.5 }}>
                {menuItems.map((item) => (
                  <Box
                    key={item.id}
                    onClick={() => navigate(`/user-details/?layout=${item.id}`)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      px: 2,
                      py: 1.5,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      mb: 0.5,
                      bgcolor: activeTab === item.id ? '#3c7399' : 'transparent',
                      color: activeTab === item.id ? 'white' : '#475569',
                      '&:hover': activeTab !== item.id ? { bgcolor: '#f1f5f9' } : {},
                    }}
                  >
                    {item.icon}
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider />

              {/* Logout */}
              <Box sx={{ p: 1.5 }}>
                <Box
                  onClick={handleLogout}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    px: 2,
                    py: 1.5,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: '#ef4444',
                    '&:hover': { bgcolor: '#fef2f2' },
                  }}
                >
                  <LogOut size={18} />
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                    Logout
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Box sx={{ bgcolor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', p: { xs: 3, md: 4 } }}>
              <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#3c7399', mb: 3 }}>
                {menuItems[activeTab]?.name}
              </Typography>
              <Divider sx={{ mb: 3 }} />
              {activeTab === 0 && <MyAccount />}
              {activeTab === 1 && <WishList />}
              {activeTab === 2 && <OrderHistory />}
              {activeTab === 3 && <ContactUs />}
            </Box>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default UserDetails;

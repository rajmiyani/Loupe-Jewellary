import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, Paper, Divider, Button, Tooltip, Grid } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Heart,
  Package,
  Headset,
  ChevronRight,
  LogOut,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../state/auth/Action";

// Sub-components
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
    { name: 'Portfolio Overview', icon: <User size={18} />, sub: 'Executive Settings', id: 0 },
    { name: 'My Collections', icon: <Heart size={18} />, sub: 'Curated Treasures', id: 1 },
    { name: 'Order Registry', icon: <Package size={18} />, sub: 'Track Shipments', id: 2 },
    { name: 'Concierge Service', icon: <Headset size={18} />, sub: 'Private Assistance', id: 3 }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f1f5f9', py: { xs: 4, md: 10 }, px: { xs: 2, md: 10 }, position: 'relative' }}>
      {/* Decorative Background Accents */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40vh', background: 'linear-gradient(180deg, #1e293b 0%, #f1f5f9 100%)', opacity: 0.05, zIndex: 0 }} />

      <div className="max-w-[1440px] mx-auto relative z-1">
        <Grid container spacing={6}>
          {/* 1. Global Navigation Sidebar (Perfection Tier) */}
          <Grid item xs={12} md={3.5}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: '32px',
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                position: 'sticky',
                top: 120,
                boxShadow: '0 20px 50px rgba(0,0,0,0.02)'
              }}
            >
              {/* Profile Narrative Section */}
              <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <div className="w-28 h-28 rounded-full bg-[#1e293b] mx-auto mb-5 flex items-center justify-center text-white text-4xl font-serif shadow-2xl border-4 border-white">
                    {auth.user?.firstName?.[0]}
                  </div>
                  <Box sx={{ position: 'absolute', bottom: 15, right: 0, bgcolor: '#97c2d5', p: 0.8, borderRadius: '50%', border: '2px solid white' }}>
                    <Zap size={14} className="text-white" />
                  </Box>
                </Box>
                <Typography sx={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e293b', mb: 0.5, fontFamily: "'Outfit', sans-serif" }}>
                  {auth.user?.firstName}
                </Typography>
                <Typography sx={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase' }}>
                  Premium Client
                </Typography>
              </Box>

              <Divider sx={{ mb: 5, opacity: 0.5 }} />

              {/* High-Fidelity Menu List */}
              <Box className="space-y-3">
                {menuItems.map((item) => (
                  <Box
                    key={item.id}
                    onClick={() => navigate(`/user-details/?layout=${item.id}`)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2.5,
                      borderRadius: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      bgcolor: activeTab === item.id ? '#1e293b' : 'transparent',
                      color: activeTab === item.id ? 'white' : '#64748b',
                      boxShadow: activeTab === item.id ? '0 10px 30px rgba(30, 41, 59, 0.2)' : 'none',
                      '&:hover': activeTab !== item.id ? { bgcolor: '#f8fafc', color: '#1e293b' } : {}
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                      <Box sx={{ color: activeTab === item.id ? '#97c2d5' : 'inherit' }}>
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 900, letterSpacing: 0.5 }}>
                          {item.name}
                        </Typography>
                        <Typography sx={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700 }}>
                          {item.sub}
                        </Typography>
                      </Box>
                    </Box>
                    {activeTab === item.id && (
                      <motion.div layoutId="arrow">
                        <ChevronRight size={16} className="text-[#97c2d5]" />
                      </motion.div>
                    )}
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 5, opacity: 0.5 }} />

              <Button
                fullWidth
                onClick={handleLogout}
                startIcon={<LogOut size={16} />}
                sx={{
                  justifyContent: 'center',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  fontWeight: 900,
                  fontSize: '0.7rem',
                  letterSpacing: 2,
                  py: 2,
                  borderRadius: '14px',
                  '&:hover': { bgcolor: '#fef2f2', color: '#ef4444' },
                  transition: 'all 0.3s'
                }}
              >
                Secure Logout
              </Button>
            </Paper>
          </Grid>

          {/* 2. Main Executive Content Module */}
          <Grid item xs={12} md={8.5}>
            <Box>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <Box sx={{ mb: 6, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography sx={{ fontSize: '3rem', fontFamily: "'Playfair Display', serif", color: '#1e293b', fontWeight: 300, letterSpacing: -1 }}>
                        {menuItems[activeTab]?.name}
                      </Typography>
                      <Box className="flex items-center gap-2 mt-2">
                        <div className="w-8 h-[2px] bg-[#97c2d5]" />
                        <Typography sx={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>
                          Loupe Jeweller Registry
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="hidden lg:flex items-center gap-6">
                      <Tooltip title="Help Center">
                        <IconButton sx={{ bgcolor: 'white', color: '#64748b' }}><HelpCircle size={20} /></IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  {/* Component Rendering */}
                  <Box>
                    {activeTab === 0 && <MyAccount />}
                    {activeTab === 1 && <WishList />}
                    {activeTab === 2 && <OrderHistory />}
                    {activeTab === 3 && <ContactUs />}
                  </Box>
                </motion.div>
              </AnimatePresence>
            </Box>
          </Grid>
        </Grid>
      </div>

      {/* 3. Floating Concierge Trigger */}
      <Box sx={{ position: 'fixed', bottom: 40, right: 40, zIndex: 100 }}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            onClick={() => navigate('/user-details/?layout=3')}
            startIcon={<Headset size={18} />}
            sx={{
              bgcolor: '#1e293b',
              color: 'white',
              px: 4,
              py: 2,
              borderRadius: '50px',
              boxShadow: '0 20px 40px rgba(30, 41, 59, 0.3)',
              fontSize: '0.7rem',
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: 'uppercase',
              '&:hover': { bgcolor: '#97c2d5' }
            }}
          >
            Direct Concierge
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default UserDetails;

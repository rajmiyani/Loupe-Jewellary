import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Paper, Grid, Avatar, Button, Tooltip, IconButton } from '@mui/material';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  ShieldCheck,
  Gem,
  Award,
  Activity,
  Lock,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

const MyAccount = () => {
  const { auth } = useSelector(store => store);

  const bentoCards = [
    {
      title: "Identity & Security",
      icon: <ShieldCheck size={20} />,
      size: 12,
      bgColor: "rgba(151, 194, 213, 0.05)",
      fields: [
        { label: "Full Name", value: `${auth?.user?.firstName} ${auth?.user?.lastName}`, icon: <ShieldCheck size={14} /> },
        { label: "Account Email", value: auth?.user?.email, icon: <Lock size={14} /> },
      ]
    },
    {
      title: "Primary Residence",
      icon: <MapPin size={20} />,
      size: 12,
      bgColor: "rgba(248, 250, 252, 1)",
      fields: [
        { label: "Street", value: auth?.user?.address?.[0]?.streetAddress || "Not provided" },
        { label: "City", value: auth?.user?.address?.[0]?.city || "Not provided" },
        { label: "State", value: auth?.user?.address?.[0]?.state || "Not provided" },
        { label: "Postal Code", value: auth?.user?.address?.[0]?.zipCode || "Not provided" },
      ]
    }
  ];

  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={3}>
        {/* 1. Cinematic Executive Hero */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: '32px',
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                color: 'white',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                gap: 4,
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              {/* Animated Background Pulse */}
              <Box sx={{
                position: 'absolute',
                right: -100,
                top: -100,
                width: 400,
                height: 400,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(151, 194, 213, 0.15) 0%, transparent 70%)',
                animation: 'pulse 10s infinite'
              }} />

              <Avatar
                sx={{
                  width: 140,
                  height: 140,
                  bgcolor: 'rgba(255,255,255,0.05)',
                  fontSize: '3.5rem',
                  fontFamily: "'Playfair Display', serif",
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  zIndex: 1
                }}
              >
                {auth?.user?.firstName?.[0]}
              </Avatar>

              <Box sx={{ zIndex: 1, textAlign: { xs: 'center', md: 'left' }, flexGrow: 1 }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 300, fontFamily: "'Playfair Display', serif", mb: 0.5, letterSpacing: -0.5 }}>
                  {auth?.user?.firstName} {auth?.user?.lastName}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Box className="flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full border border-white/10 backdrop-blur-md">
                    <ShieldCheck size={14} className="text-[#97c2d5]" />
                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: 1.5, textTransform: 'uppercase' }}>Verified Portfolio</Typography>
                  </Box>
                  <Box className="flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full border border-white/10 backdrop-blur-md">
                    <Activity size={14} className="text-[#97c2d5]" />
                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: 1.5, textTransform: 'uppercase' }}>Legacy Member</Typography>
                  </Box>
                </Box>
              </Box>

              <Button
                variant="contained"
                startIcon={<Edit3 size={18} />}
                sx={{
                  bgcolor: 'white',
                  color: '#1e293b',
                  px: 5,
                  py: 2,
                  borderRadius: '16px',
                  fontSize: '0.8rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                  zIndex: 1,
                  '&:hover': { bgcolor: '#97c2d5', color: 'white', transform: 'scale(1.02)' },
                  transition: 'all 0.3s ease'
                }}
              >
                Edit Portfolio
              </Button>
            </Paper>
          </motion.div>
        </Grid>

        {/* 2. Perfection Bento Grid */}
        {bentoCards.map((card, idx) => (
          <Grid item xs={12} md={card.size} key={idx}>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + (idx * 0.1) }}
              style={{ height: '100%' }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: '32px',
                  bgcolor: 'white',
                  border: '1px solid #f1f5f9',
                  height: '100%',
                  position: 'relative',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  overflow: 'hidden',
                  '&:hover': {
                    boxShadow: '0 30px 60px rgba(15, 23, 42, 0.05)',
                    borderColor: '#1e293b',
                    '& .card-icon': { bgcolor: '#1e293b', color: 'white' }
                  }
                }}
              >
                <Box sx={{ display: 'flex', itemsCenter: 'center', justifyContent: 'space-between', mb: 4 }}>
                  <Box sx={{ display: 'flex', itemsCenter: 'center', gap: 2 }}>
                    <Box
                      className="card-icon"
                      sx={{
                        p: 1.5,
                        borderRadius: '14px',
                        bgcolor: card.bgColor,
                        color: '#1e293b',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {card.icon}
                    </Box>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 900, color: '#1e293b', textTransform: 'uppercase', letterSpacing: 1.5 }}>
                      {card.title}
                    </Typography>
                  </Box>
                  <IconButton size="small"><ExternalLink size={16} className="text-gray-300" /></IconButton>
                </Box>

                {card.content ? card.content : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {card.fields.map((field, fIdx) => (
                      <div key={fIdx}>
                        <Typography sx={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                          {field.icon} {field.label}
                        </Typography>
                        <Typography sx={{ fontSize: '1.05rem', color: '#1e293b', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>
                          {field.value || "—"}
                        </Typography>
                      </div>
                    ))}
                  </div>
                )}
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <style>
        {`
                    @keyframes pulse {
                        0% { transform: scale(1); opacity: 0.15; }
                        50% { transform: scale(1.1); opacity: 0.2; }
                        100% { transform: scale(1); opacity: 0.15; }
                    }
                `}
      </style>
    </Box>
  );
};

export default MyAccount;

import React from 'react';
import { Box, Typography, Grid, Paper, IconButton } from '@mui/material';
import { Phone, Mail, MessageSquare, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactUs = () => {
  const contactMethods = [
    {
      title: "Direct Assistance",
      icon: <Phone size={24} className="text-[#3c7399]" />,
      value: "99091 09074",
      sub: "Also: 99091 87074 | 99091 09974",
      action: "Call Concierge",
      link: "tel:+919909109074"
    },
    {
      title: "Electronic Inquiry",
      icon: <Mail size={24} className="text-[#3c7399]" />,
      value: "loupejewelsllp@gmail.com",
      sub: "Expected response within 24 boutique hours",
      action: "Send Inquiry",
      link: "mailto:loupejewelsllp@gmail.com"
    }
  ];

  const handleAction = (link) => {
    if (link) window.location.href = link;
  };

  return (
    <Box sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 12 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Typography
            sx={{
              fontSize: '0.8rem',
              fontWeight: 900,
              color: '#3c7399',
              letterSpacing: 6,
              mb: 3,
              textTransform: 'uppercase'
            }}
          >
            Exclusive Membership
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 300,
              fontFamily: "'Playfair Display', serif",
              letterSpacing: 2,
              color: '#3c7399',
              mb: 4,
              lineHeight: 1.1
            }}
          >
            Loupe Concierge <br /> <span className="italic font-serif">Service</span>
          </Typography>
          <Typography
            sx={{
              fontSize: '1.1rem',
              color: '#64748b',
              maxWidth: 700,
              mx: 'auto',
              mb: 6,
              lineHeight: 1.8,
              fontWeight: 400
            }}
          >
            Our dedicated concierge team is at your immediate disposal. From bespoke design consultations to personal order logistics, we ensure your journey with Loupe is nothing short of extraordinary.
          </Typography>
          <div className="w-24 h-[1px] bg-[#3c7399] mx-auto opacity-20" />
        </motion.div>
      </Box>

      <Grid container spacing={5} justifyContent="center">
        {contactMethods.map((method, idx) => (
          <Grid item xs={12} md={5} key={idx}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + (idx * 0.2), duration: 0.8 }}
              whileHover={{ y: -12 }}
              onClick={() => handleAction(method.link)}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 6, md: 8 },
                  borderRadius: '40px',
                  bgcolor: 'white',
                  border: '1px solid rgba(241, 245, 249, 1)',
                  textAlign: 'center',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0 40px 80px rgba(15, 23, 42, 0.1)',
                    borderColor: '#3c7399',
                    '& .method-icon': { bgcolor: '#3c7399', color: 'white', transform: 'rotate(10deg)' }
                  }
                }}
              >
                {/* Decorative Background Glow */}
                <Box sx={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(151, 194, 213, 0.05)', filter: 'blur(40px)' }} />

                <Box
                  className="method-icon"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '24px',
                    bgcolor: '#f8fafc',
                    color: '#3c7399',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 5,
                    transition: 'all 0.4s ease'
                  }}
                >
                  {React.cloneElement(method.icon, { size: 32 })}
                </Box>

                <Typography sx={{ fontSize: '1.4rem', fontWeight: 900, color: '#3c7399', mb: 1.5, fontFamily: "'Outfit', sans-serif", letterSpacing: 0.5 }}>
                  {method.title}
                </Typography>

                <Typography sx={{ fontSize: '1.25rem', fontWeight: 300, color: '#475569', mb: 2, fontFamily: "'Playfair Display', serif" }}>
                  {method.value}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 6 }}>
                  <Clock size={14} className="text-[#3c7399]" />
                  <Typography sx={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                    {method.sub}
                  </Typography>
                </Box>

                <div className="flex items-center justify-center gap-3 py-4 border-t border-gray-50 group text-[#3c7399] font-black uppercase text-[0.75rem] tracking-[0.25em]">
                  <span>{method.action}</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-2 text-[#3c7399]" />
                </div>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Trust Signifier */}
      <Box sx={{ mt: 15, textAlign: 'center' }}>
        <Box sx={{ display: 'inline-flex', itemsCenter: 'center', gap: 4, px: 6, py: 2, borderRadius: 'full', border: '1px solid #f1f5f9' }}>
          <Typography sx={{ fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 3 }}>
            Global
          </Typography>
          <div className="w-1 h-1 bg-gray-200 rounded-full" />
          <Typography sx={{ fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 3 }}>
            24/7 Security
          </Typography>
          <div className="w-1 h-1 bg-gray-200 rounded-full" />
          <Typography sx={{ fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 3 }}>
            Private Brokerage
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUs;

import React from 'react';
import { Box, Typography, Container, Grid, Paper, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const ContactInfo = () => {
  return (
    <Box sx={{ py: 10, bgcolor: '#fafafa', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: '#3c7399', mb: 2 }}>
            Contact Us
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', maxWidth: 600, mx: 'auto' }}>
            We're here to help. Reach out to our dedicated concierge team for personalized assistance, styling advice, or any questions about your order.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 5, height: '100%', textAlign: 'center', borderRadius: '16px', border: '1px solid #f1f5f9', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' } }}>
              <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: '#f0f9ff', color: '#3c7399', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
                <LocationOnIcon fontSize="large" />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#3c7399', mb: 2 }}>
                Visit Our Boutique
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.8 }}>
                Sardar Avas, Diamond, <br />
                Managadh Chowk, <br />
                Varachha Main Road, Varachha, <br />
                Surat, Gujarat, India
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 5, height: '100%', textAlign: 'center', borderRadius: '16px', border: '1px solid #f1f5f9', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' } }}>
              <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: '#f0f9ff', color: '#3c7399', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
                <EmailIcon fontSize="large" />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#3c7399', mb: 2 }}>
                Email Us
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.8, mb: 2 }}>
                Our team typically responds within 24 hours during business days.
              </Typography>
              <a href="mailto:loupejewelsllp@gmail.com" style={{ color: '#3c7399', fontWeight: 600, textDecoration: 'none' }}>
                loupejewelsllp@gmail.com
              </a>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 5, height: '100%', textAlign: 'center', borderRadius: '16px', border: '1px solid #f1f5f9', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' } }}>
              <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: '#f0f9ff', color: '#3c7399', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
                <PhoneIcon fontSize="large" />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#3c7399', mb: 2 }}>
                Call or WhatsApp
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.8, mb: 2 }}>
                Available Monday to Saturday <br />
                10:00 AM - 7:00 PM (IST)
              </Typography>
              <a href="tel:+919909109074" style={{ display: 'block', color: '#3c7399', fontWeight: 600, textDecoration: 'none', marginBottom: '8px' }}>
                +91 99091 09074
              </a>
              <IconButton component="a" href="https://wa.me/919909109074" target="_blank" sx={{ color: '#25D366' }}>
                <WhatsAppIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactInfo;

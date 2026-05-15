import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const TermsOfService = () => {
  return (
    <Box sx={{ py: 10, bgcolor: '#fafafa', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ bgcolor: 'white', p: { xs: 4, md: 8 }, borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
        <Typography variant="h3" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: '#755970', mb: 2, textAlign: 'center' }}>
          Terms of Service
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', color: '#64748b', mb: 6, textTransform: 'uppercase', letterSpacing: 2 }}>
          Last Updated: {new Date().toLocaleDateString()}
        </Typography>

        <Box sx={{ color: '#334155', lineHeight: 1.8, '& h5': { color: '#755970', fontWeight: 700, mt: 4, mb: 2, fontSize: '1.2rem' } }}>
          <Typography sx={{ mb: 3 }}>
            Welcome to Loupe Jewellery. By accessing or using our website, you agree to be bound by the following terms and conditions. Please read them carefully.
          </Typography>

          <h5>1. General Conditions</h5>
          <Typography sx={{ mb: 3 }}>
            We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information) may be transferred unencrypted and involve transmissions over various networks.
          </Typography>

          <h5>2. Accuracy of Information</h5>
          <Typography sx={{ mb: 3 }}>
            While we strive to provide accurate product images, descriptions, and pricing, errors may occur. We reserve the right to correct any errors, inaccuracies, or omissions, and to change or update information or cancel orders if any information is inaccurate at any time without prior notice.
          </Typography>

          <h5>3. Pricing and Availability</h5>
          <Typography sx={{ mb: 3 }}>
            Prices for our products are subject to change without notice. We reserve the right to modify or discontinue any product or service at any time. We shall not be liable to you or to any third party for any modification, price change, suspension, or discontinuance.
          </Typography>

          <h5>4. Intellectual Property</h5>
          <Typography sx={{ mb: 3 }}>
            All content included on this site, such as text, graphics, logos, images, and software, is the property of Loupe Jewellery or its content suppliers and protected by copyright laws.
          </Typography>

          <h5>5. User Comments and Feedback</h5>
          <Typography sx={{ mb: 3 }}>
            If you send us specific submissions (like contest entries) or creative ideas, suggestions, or proposals, you agree that we may use them without restriction and without obligation to compensate you.
          </Typography>

          <h5>6. Governing Law</h5>
          <Typography sx={{ mb: 3 }}>
            These Terms of Service shall be governed by and construed in accordance with the laws of India, particularly the jurisdiction of Surat, Gujarat.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default TermsOfService;

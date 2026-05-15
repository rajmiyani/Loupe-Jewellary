import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const RefundPolicy = () => {
  return (
    <Box sx={{ py: 10, bgcolor: '#fafafa', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ bgcolor: 'white', p: { xs: 4, md: 8 }, borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
        <Typography variant="h3" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: '#755970', mb: 2, textAlign: 'center' }}>
          Refund & Return Policy
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', color: '#64748b', mb: 6, textTransform: 'uppercase', letterSpacing: 2 }}>
          Last Updated: {new Date().toLocaleDateString()}
        </Typography>

        <Box sx={{ color: '#334155', lineHeight: 1.8, '& h5': { color: '#755970', fontWeight: 700, mt: 4, mb: 2, fontSize: '1.2rem' } }}>
          <Typography sx={{ mb: 3 }}>
            At Loupe Jewellery, we strive to ensure you are completely satisfied with your purchase. If you are not entirely happy with your item, we are here to help.
          </Typography>

          <h5>1. 7-Day Return Policy</h5>
          <Typography sx={{ mb: 3 }}>
            We offer a 7-day return policy on all eligible jewellery. If you are not satisfied with your purchase, you may return it within 7 days of delivery for a full refund or exchange. The item must be in its original, unworn condition with all original tags, certificates, and packaging intact.
          </Typography>

          <h5>2. Non-Returnable Items</h5>
          <Typography sx={{ mb: 3 }}>
            Custom-made, engraved, or altered pieces are non-returnable and non-refundable. Items that show signs of wear or have been damaged after delivery will not be accepted for return.
          </Typography>

          <h5>3. Lifetime Buyback & Exchange</h5>
          <Typography sx={{ mb: 3 }}>
            We offer a lifetime exchange and buyback policy on all gold and diamond jewellery purchased from us. Exchange value will be calculated based on the current market value of the metal and stones, minus making charges and applicable deductions.
          </Typography>

          <h5>4. Refund Process</h5>
          <Typography sx={{ mb: 3 }}>
            Once we receive your returned item, it will be inspected by our quality assurance team. If approved, your refund will be processed to the original method of payment within 7-10 business days.
          </Typography>

          <h5>5. How to Initiate a Return</h5>
          <Typography sx={{ mb: 3 }}>
            To initiate a return, please contact our customer care team at loupejewelsllp@gmail.com with your order number and reason for return. We will provide you with further instructions and arrange for a secure pickup.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default RefundPolicy;

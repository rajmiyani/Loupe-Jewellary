import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const ShippingPolicy = () => {
  return (
    <Box sx={{ py: 10, bgcolor: '#fafafa', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ bgcolor: 'white', p: { xs: 4, md: 8 }, borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
        <Typography variant="h3" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: '#3c7399', mb: 2, textAlign: 'center' }}>
          Shipping Policy
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', color: '#64748b', mb: 6, textTransform: 'uppercase', letterSpacing: 2 }}>
          Last Updated: {new Date().toLocaleDateString()}
        </Typography>

        <Box sx={{ color: '#334155', lineHeight: 1.8, '& h5': { color: '#3c7399', fontWeight: 700, mt: 4, mb: 2, fontSize: '1.2rem' } }}>
          <Typography sx={{ mb: 3 }}>
            We understand how important it is to receive your jewellery on time and in pristine condition. Our shipping process is designed to be secure, transparent, and fast.
          </Typography>

          <h5>1. Processing Time</h5>
          <Typography sx={{ mb: 3 }}>
            In-stock items are typically processed and shipped within 1-3 business days. Custom-made or personalized pieces require additional time and usually ship within 7-14 business days.
          </Typography>

          <h5>2. Shipping Methods and Costs</h5>
          <Typography sx={{ mb: 3 }}>
            We offer fully insured, expedited shipping on all domestic orders free of charge. For international orders, shipping fees are calculated at checkout based on destination and package weight.
          </Typography>

          <h5>3. Secure Packaging</h5>
          <Typography sx={{ mb: 3 }}>
            All orders are shipped in discreet, unbranded outer packaging to ensure the security of your high-value item during transit. Inside, your jewellery will be beautifully presented in our signature Loupe presentation box.
          </Typography>

          <h5>4. Tracking Your Order</h5>
          <Typography sx={{ mb: 3 }}>
            Once your order ships, you will receive a confirmation email containing your tracking number and a link to track your package in real-time.
          </Typography>

          <h5>5. Delivery Requirements</h5>
          <Typography sx={{ mb: 3 }}>
            For your protection, all orders require a direct signature upon delivery. We cannot ship to P.O. boxes. Please ensure someone is available at the delivery address to sign for the package.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ShippingPolicy;

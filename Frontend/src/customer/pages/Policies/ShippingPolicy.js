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

          <h5>1. Payment Terms</h5>
          <Typography sx={{ mb: 3 }} component="div">
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '8px' }}><strong>Customized Jewellery:</strong> A 50% advance payment is required to begin production. The remaining 50% balance must be cleared prior to shipping.</li>
                <li><strong>Ready Stock Jewellery:</strong> 100% payment is required at the time of purchase.</li>
            </ul>
          </Typography>

          <h5>2. Shipping & Delivery Timelines</h5>
          <Typography sx={{ mb: 3 }} component="div">
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '8px' }}><strong>Ready Stock Jewellery:</strong> Dispatched and delivered within <strong>5-7 working days</strong>.</li>
                <li><strong>Customized Jewellery:</strong> Requires <strong>10-12 days</strong> for production and readiness, followed by an additional <strong>5-7 days</strong> for delivery (Approx. 20 days total from the date of order confirmation).</li>
            </ul>
          </Typography>

          <h5>3. Secure Packaging & Delivery</h5>
          <Typography sx={{ mb: 3 }}>
            All orders are shipped securely. For your protection, all orders require a direct signature upon delivery. We cannot ship to P.O. boxes. Please ensure someone is available at the delivery address to sign for the package.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ShippingPolicy;

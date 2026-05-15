import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Box sx={{ py: 10, bgcolor: '#fafafa', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ bgcolor: 'white', p: { xs: 4, md: 8 }, borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
        <Typography variant="h3" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: '#755970', mb: 2, textAlign: 'center' }}>
          Privacy Policy
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', color: '#64748b', mb: 6, textTransform: 'uppercase', letterSpacing: 2 }}>
          Last Updated: {new Date().toLocaleDateString()}
        </Typography>

        <Box sx={{ color: '#334155', lineHeight: 1.8, '& h5': { color: '#755970', fontWeight: 700, mt: 4, mb: 2, fontSize: '1.2rem' } }}>
          <Typography sx={{ mb: 3 }}>
            At Loupe Jewellery LLP, your privacy is of utmost importance to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our website or make a purchase from us.
          </Typography>

          <h5>1. Information We Collect</h5>
          <Typography sx={{ mb: 3 }}>
            When you visit our site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the site, and information about how you interact with the site.
          </Typography>

          <h5>2. How We Use Your Information</h5>
          <Typography sx={{ mb: 3 }}>
            We use the order information that we collect generally to fulfill any orders placed through the site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this order information to communicate with you and screen our orders for potential risk or fraud.
          </Typography>

          <h5>3. Sharing Your Personal Information</h5>
          <Typography sx={{ mb: 3 }}>
            We share your personal information with third parties to help us use your personal information, as described above. We use Google Analytics to help us understand how our customers use the site. We may also share your personal information to comply with applicable laws and regulations, to respond to a subpoena, search warrant, or other lawful request for information we receive, or to otherwise protect our rights.
          </Typography>

          <h5>4. Data Retention</h5>
          <Typography sx={{ mb: 3 }}>
            When you place an order through the site, we will maintain your order information for our records unless and until you ask us to delete this information.
          </Typography>

          <h5>5. Changes</h5>
          <Typography sx={{ mb: 3 }}>
            We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.
          </Typography>

          <h5>Contact Us</h5>
          <Typography sx={{ mb: 3 }}>
            For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at loupejewelsllp@gmail.com.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;

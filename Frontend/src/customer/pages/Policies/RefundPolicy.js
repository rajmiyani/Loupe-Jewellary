import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const RefundPolicy = () => {
  return (
    <Box sx={{ py: 10, bgcolor: '#fafafa', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ bgcolor: 'white', p: { xs: 4, md: 8 }, borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
        <Typography variant="h3" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: '#3c7399', mb: 2, textAlign: 'center' }}>
          Refund & Return Policy
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', color: '#64748b', mb: 6, textTransform: 'uppercase', letterSpacing: 2 }}>
          Last Updated: {new Date().toLocaleDateString()}
        </Typography>

        <Box sx={{ color: '#334155', lineHeight: 1.8, '& h5': { color: '#3c7399', fontWeight: 700, mt: 4, mb: 2, fontSize: '1.2rem' } }}>
          <Typography sx={{ mb: 3 }}>
            At Loupe Jewellery, we strive to ensure you are completely satisfied with your purchase. If you are not entirely happy with your item, we are here to help.
          </Typography>

          <h5>1. Return & Exchange Valuation</h5>
          <Typography sx={{ mb: 3 }}>
            We offer a <strong>100% return on the current metal price</strong> of your jewellery. However, Labour charges, GST, and shipping charges will be deducted from the total refund or exchange amount.
          </Typography>

          <h5>2. Eligibility (Ready Stock vs Customized)</h5>
          <Typography sx={{ mb: 3 }} component="div">
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '8px' }}><strong>Ready Stock (In-stock):</strong> Eligible for buyback and exchange according to the valuation policy above.</li>
                <li><strong>Customized Jewellery:</strong> Customized jewellery is strictly <strong>not eligible</strong> for buyback, return, or exchange.</li>
            </ul>
          </Typography>

          <h5>3. Product Condition & Quality Control (QC)</h5>
          <Typography sx={{ mb: 3 }}>
            The returned jewellery must be <strong>strictly unused</strong> and in its original, pristine condition. Once the item is received at our facility, our Quality Control (QC) team will conduct a thorough inspection. If any damage is detected or if the original certification is missing, additional charges will apply and be deducted from the refund. Furthermore, if the jewellery has been altered, repaired, or tampered with by any <strong>third-party jeweller</strong>, the final decision regarding the return or exchange will remain solely at the discretion of the seller.
          </Typography>

          <h5>4. Documentation & Unboxing Video</h5>
          <Typography sx={{ mb: 3 }} component="div">
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '8px' }}>An <strong>unboxing video</strong> of the delivered package is mandatory for any return or exchange claims. If an unboxing video is not provided, the final decision will rest entirely with the seller.</li>
                <li>The <strong>original GST bill</strong> (or a valid copy) must be presented at the time of initiating a Return or Exchange (R&E).</li>
            </ul>
          </Typography>

          <h5>5. Return Shipping & Refund Process</h5>
          <Typography sx={{ mb: 3 }}>
            A <strong>2% return shipping charge</strong> will be levied on the overall product value for processing the return pickup. Once the jewellery passes our QC inspection, the final refund amount will be processed and credited to your bank account via <strong>RTGS or NEFT within 7-10 working days</strong>.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default RefundPolicy;

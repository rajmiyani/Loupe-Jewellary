import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import DiamondIcon from '@mui/icons-material/Diamond';
import VerifiedIcon from '@mui/icons-material/Verified';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import HandymanIcon from '@mui/icons-material/Handyman';

const AboutUs = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fafafa', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: '0.25em',
              fontWeight: 700,
              color: '#3c7399',
              textTransform: 'uppercase',
              fontSize: '0.85rem',
            }}
          >
            The Loupe Heritage
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: '#1e3545',
              fontSize: { xs: '2.2rem', sm: '3rem', md: '3.6rem' },
              mt: 1,
              mb: 3,
            }}
          >
            Crafting Timeless Brilliance
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#64748b',
              maxWidth: 760,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.15rem' },
              lineHeight: 1.8,
            }}
          >
            Based in the diamond capital of Surat, Gujarat, Loupe Jewels (Loupe Jewellery LLP) represents the harmonious union of traditional Indian goldsmithing and modern ethical diamond engineering.
          </Typography>
        </Box>

        {/* Core Pillars */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {[
            {
              icon: <DiamondIcon fontSize="large" />,
              title: 'Ethical Lab-Grown Diamonds',
              desc: 'Grown under state-of-the-art CVD and HPHT technology, our diamonds are 100% physically, chemically, and optically identical to mined diamonds with zero ecological and human conflict.',
            },
            {
              icon: <VerifiedIcon fontSize="large" />,
              title: 'Certified Authenticity',
              desc: 'Every diamond is independently certified by leading international gemological laboratories (IGI & GIA standards), and every metal setting is 100% BIS hallmarked gold.',
            },
            {
              icon: <HandymanIcon fontSize="large" />,
              title: 'Master Artistry',
              desc: 'Handcrafted by generational artisans with meticulous stone-setting, microscopic prong finishing, and silky smooth comfort bands built to last generations.',
            },
            {
              icon: <AutoAwesomeIcon fontSize="large" />,
              title: 'Bespoke Customization',
              desc: 'From custom engagement rings to festive bridal statement pieces, our bespoke team transforms your personal sketches into 3D CAD models and heirloom jewels.',
            },
          ].map((pillar, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: '20px',
                  border: '1px solid #f1f5f9',
                  bgcolor: '#ffffff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 18px 36px rgba(0,0,0,0.06)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    bgcolor: '#f0f9ff',
                    color: '#3c7399',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2.5,
                  }}
                >
                  {pillar.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e3545', mb: 1.5 }}>
                  {pillar.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7 }}>
                  {pillar.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Story Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 8 },
            borderRadius: '24px',
            bgcolor: '#ffffff',
            border: '1px solid #f1f5f9',
            mb: 10,
          }}
        >
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  color: '#1e3545',
                  mb: 2.5,
                }}
              >
                Our Surat Atelier
              </Typography>
              <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.9, mb: 2 }}>
                Loupe Jewels was founded with a singular conviction: fine jewellery should be as conscious as it is breathtaking. We craft all our creations in Surat, India—the heart of the world’s diamond trade.
              </Typography>
              <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.9 }}>
                By pairing ethical laboratory diamond synthesis with BIS-hallmarked 14K and 18K gold, we deliver luxury pieces with maximum fire, clarity, and certified integrity at unmatched transparency.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: '#f0f7fc',
                  p: 4,
                  borderRadius: '16px',
                  border: '1px solid #e0edf6',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e3545', mb: 2 }}>
                  Direct Concierge Support
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 1.5 }}>
                  <strong>Brand:</strong> Loupe Jewels (Loupe Jewellery LLP)
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 1.5 }}>
                  <strong>Atelier:</strong> 12-17 Sardar Owners Association, Mini Bazar, Varachha, Surat, Gujarat, India - 395006
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 1.5 }}>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:loupejewelsllp@gmail.com" style={{ color: '#3c7399', fontWeight: 600 }}>
                    loupejewelsllp@gmail.com
                  </a>
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
                  <strong>Phone:</strong>{' '}
                  <a href="tel:+919909109074" style={{ color: '#3c7399', fontWeight: 600 }}>
                    +91 99091 09074
                  </a>
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Link
                    to="/contact"
                    style={{
                      display: 'inline-block',
                      background: '#3c7399',
                      color: '#ffffff',
                      padding: '10px 22px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      fontSize: '0.88rem',
                    }}
                  >
                    Contact Concierge
                  </Link>
                  <Link
                    to="/all-jewellery"
                    style={{
                      display: 'inline-block',
                      background: '#ffffff',
                      color: '#3c7399',
                      border: '1px solid #3c7399',
                      padding: '10px 22px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      fontSize: '0.88rem',
                    }}
                  >
                    Explore Collections
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutUs;

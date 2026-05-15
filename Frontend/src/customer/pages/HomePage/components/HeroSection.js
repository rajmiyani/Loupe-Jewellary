import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: '100%',
                height: { xs: '75vh', md: '85vh' },
                position: 'relative',
                overflow: 'hidden',
                bgcolor: '#0f172a'
            }}
        >
            {/* Simple Premium Background */}
            <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 z-0"
            >
                <div
                    className="w-full h-full bg-cover bg-center"
                    loading="lazy"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2500&auto=format&fit=crop")',
                        filter: 'brightness(0.7)'
                    }}
                />
                <div className="absolute inset-0 bg-black/30" />
            </motion.div>

            {/* Simple Elegant Content */}
            <div className="relative z-10 h-full mx-auto max-w-[1400px] flex items-center px-6 lg:px-12">
                <div className="max-w-[700px]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <Typography
                            variant="overline"
                            sx={{
                                letterSpacing: 6,
                                fontWeight: 700,
                                color: '#755970',
                                fontSize: { xs: '0.7rem', md: '0.8rem' },
                                mb: 2,
                                display: 'block'
                            }}
                        >
                            THE LOUPE COLLECTION
                        </Typography>

                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '3rem', md: '5rem' },
                                fontWeight: 800,
                                fontFamily: "'Playfair Display', serif",
                                lineHeight: 1.1,
                                color: '#ffffff',
                                mb: 3
                            }}
                        >
                            Timeless Elegance <br />
                            <span className="text-[#755970] italic font-light">Redefined.</span>
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: { xs: '1rem', md: '1.2rem' },
                                maxWidth: 500,
                                mb: 5,
                                lineHeight: 1.7
                            }}
                        >
                            Discover handcrafted pieces that capture the essence of luxury and sophistication.
                        </Typography>

                        <Button
                            onClick={() => navigate('/all-jewellery')}
                            variant="contained"
                            endIcon={<ArrowRight size={20} />}
                            sx={{
                                bgcolor: '#755970',
                                color: 'white',
                                px: { xs: 4, md: 6 },
                                py: { xs: 1.5, md: 2 },
                                borderRadius: '100px',
                                fontSize: '0.9rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: 2,
                                '&:hover': {
                                    bgcolor: '#ffffff',
                                    color: '#0f172a',
                                    transform: 'translateY(-3px)'
                                },
                                transition: 'all 0.3s'
                            }}
                        >
                            Shop Collection
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Subtle Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f172a]/40 to-transparent" />
        </Box>
    );
};

export default HeroSection;

import React from 'react';
import { Box, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import { motion } from 'framer-motion';

const socialImages = [
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1605100804763-247f67b3f41e?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1611085510590-09c063b46903?q=80&w=1000&auto=format&fit=crop',
    '/collection_necklace_flatlay_1778402783094.png',
    '/collection_earrings_detail_1778402856818.png'
];

const SocialFeed = () => {
    return (
        <Box sx={{ py: { xs: 10, md: 16 }, px: { xs: 3, md: 12 }, bgcolor: '#ffffff' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', marginBottom: '60px' }}
            >
                <Typography
                    variant="overline"
                    sx={{ letterSpacing: 4, fontWeight: 800, color: '#755970', fontSize: '0.8rem' }}
                >
                    FOLLOW @LOUPEJEWELRY
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: '#64748b', mt: 1, fontWeight: 500, letterSpacing: 1 }}
                >
                    Tag us to get featured #loupejewelry
                </Typography>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-5"
            >
                {socialImages.map((img, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative group cursor-pointer"
                    >
                        <Box
                            sx={{
                                aspectRatio: '1/1',
                                overflow: 'hidden',
                                borderRadius: '24px',
                                position: 'relative',
                                '&:hover img': { transform: 'scale(1.1)' },
                                '&:hover .social-overlay': { opacity: 1 }
                            }}
                        >
                            <img
                                src={img}
                                alt={`Social ${i}`}
                                className="w-full h-full object-cover transition-transform duration-1000"
                            />
                            <Box
                                className="social-overlay"
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    bgcolor: 'rgba(151, 194, 213, 0.4)',
                                    backdropFilter: 'blur(4px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: 0,
                                    transition: 'opacity 0.4s'
                                }}
                            >
                                <InstagramIcon sx={{ color: 'white', fontSize: '2.5rem' }} />
                            </Box>
                        </Box>
                    </motion.div>
                ))}
            </motion.div>
        </Box>
    );
};

export default SocialFeed;

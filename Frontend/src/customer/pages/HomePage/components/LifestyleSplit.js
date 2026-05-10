import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

const LifestyleSplit = () => {
    return (
        <Box sx={{ py: { xs: 10, md: 16 }, px: { xs: 3, md: 12 }, bgcolor: '#ffffff' }}>
            <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: 'serif',
                            fontWeight: 400,
                            color: '#1e293b',
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            lineHeight: 1.1,
                            mb: 4
                        }}
                    >
                        Crafted for <br />
                        <span className="italic text-[#97c2d5]">Every Moment</span>
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#64748b',
                            fontSize: '1.15rem',
                            lineHeight: 1.8,
                            mb: 6,
                            maxWidth: 500
                        }}
                    >
                        From everyday elegance to unforgettable occasions, our pieces are made to be a part of your story.
                        Each design is a testament to timeless beauty and modern sophistication.
                    </Typography>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: '#97c2d5',
                            color: '#97c2d5',
                            px: 5,
                            py: 1.8,
                            borderRadius: '100px',
                            fontWeight: 700,
                            letterSpacing: 2,
                            textTransform: 'uppercase',
                            fontSize: '0.8rem',
                            borderWidth: '2px',
                            '&:hover': {
                                borderWidth: '2px',
                                borderColor: '#7ea9bd',
                                bgcolor: 'rgba(151,194,213,0.05)',
                                transform: 'translateY(-2px)'
                            },
                            transition: 'all 0.3s'
                        }}
                    >
                        Explore Lookbook
                    </Button>
                </motion.div>

                {/* Images Grid - Mosaic Style */}
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-12"
                    >
                        <Box
                            sx={{
                                borderRadius: '40px',
                                overflow: 'hidden',
                                aspectRatio: '1/1.3',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.08)'
                            }}
                        >
                            <img
                                src="/jewelry_reels_lifestyle_1778401192100.png"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                                alt="Lifestyle 1"
                            />
                        </Box>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Box
                            sx={{
                                borderRadius: '40px',
                                overflow: 'hidden',
                                aspectRatio: '1/1.3',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.08)'
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1544441893-675973e31d85?q=80&w=1000&auto=format&fit=crop"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                                alt="Lifestyle 2"
                            />
                        </Box>
                    </motion.div>
                </div>

            </div>
        </Box>
    );
};

export default LifestyleSplit;

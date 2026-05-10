import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Play, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const reels = [
    { id: 1, name: 'Luna Pendant', price: '$850.00', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, name: 'Infinite Shine Ring', price: '$1,200.00', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3f41e?q=80&w=1000&auto=format&fit=crop' },
    { id: 3, name: 'Pearl Drop Earrings', price: '$540.00', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop' },
    { id: 4, name: 'Golden Link Bracelet', price: '$1,100.00', img: 'https://images.unsplash.com/photo-1611085510590-09c063b46903?q=80&w=1000&auto=format&fit=crop' },
    { id: 5, name: 'Signature Lifestyle', price: '$2,400.00', img: '/jewelry_reels_lifestyle_1778401192100.png' },
    { id: 6, name: 'Artisan Collection', price: '$1,800.00', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop' }
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 15 } }
};

const MotionReels = () => {
    return (
        <Box sx={{ py: 10, px: { xs: 2, md: 10 }, bgcolor: '#ffffff' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6 }}>
                <Box>
                    <Typography
                        variant="overline"
                        sx={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: 3, color: '#97c2d5', display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        STYLED IN MOTION <span className="text-sm">✨</span>
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{ fontFamily: 'serif', fontWeight: 400, color: '#1e293b', mt: 1, fontSize: { xs: '1.75rem', md: '2.5rem' } }}
                    >
                        See how our pieces shine in real moments.
                    </Typography>
                </Box>
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 700,
                        color: '#64748b',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: 1.5,
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        gap: 1,
                        pb: 0.5,
                        borderBottom: '2px solid #f1f5f9',
                        '&:hover': { color: '#97c2d5', borderColor: '#97c2d5' },
                        transition: 'all 0.3s'
                    }}
                >
                    View All Reels <ChevronRight size={16} />
                </Typography>
            </Box>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="flex gap-5 md:gap-7 overflow-x-auto pb-8 snap-x no-scrollbar"
                style={{
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                {reels.map((reel) => (
                    <motion.div
                        key={reel.id}
                        variants={itemVariants}
                        className="snap-start"
                        style={{ minWidth: 'calc(280px)' }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                aspectRatio: '3/4.5',
                                cursor: 'pointer',
                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover img': { transform: 'scale(1.1)' },
                                '&:hover .reel-overlay': { bgcolor: 'rgba(0,0,0,0.1)' },
                                '&:hover .play-btn': { scale: 1.1, bgcolor: '#97c2d5' },
                                boxLight: '0 10px 30px rgba(0,0,0,0.05)'
                            }}
                        >
                            <img
                                src={reel.img}
                                alt={reel.name}
                                className="w-full h-full object-cover transition-transform duration-1000"
                            />

                            <div className="reel-overlay absolute inset-0 bg-transparent transition-all duration-500" />

                            {/* Play Button */}
                            <div className="play-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center transition-all duration-500 scale-100 shadow-xl">
                                <Play fill="white" color="white" size={24} className="ml-1" />
                            </div>

                            {/* Info Overlay */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    p: 3.5,
                                    background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                                    color: 'white'
                                }}
                            >
                                <Typography sx={{ fontSize: '1rem', fontWeight: 700, mb: 0.5 }}>{reel.name}</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography sx={{ opacity: 0.9, fontSize: '0.9rem', fontWeight: 500 }}>{reel.price}</Typography>
                                    <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', '&:hover': { bgcolor: 'white', color: '#97c2d5' } }}>
                                        <ShoppingBag size={18} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    </motion.div>
                ))}
            </motion.div>
        </Box>
    );
};

export default MotionReels;

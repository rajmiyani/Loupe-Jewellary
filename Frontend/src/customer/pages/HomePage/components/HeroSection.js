import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Gem, ShieldCheck, Gift } from 'lucide-react';

const panel1Variants = {
    hidden: { opacity: 0, scale: 1.04, x: -18 },
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] }
    }
};

const panel2Variants = {
    hidden: { opacity: 0, scale: 1.04, y: -16 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }
    }
};

const panel3Variants = {
    hidden: { opacity: 0, scale: 1.04, y: 16 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.9, delay: 0.38, ease: [0.22, 1, 0.36, 1] }
    }
};

// Known default product IDs matching the signature banner showcases
const DEFAULT_BRACELET_ID = '6aa0f39919359828e0775f01'; // Heart Shape Diamond Tennis Bracelet
const DEFAULT_EARRING_ID = '6aaeba3a528840592b0e24c5';  // GG Buckle Diamond Stud Earrings
const DEFAULT_RING_ID = '6aaebcd2528840592b0e264e';     // Infinity Diamond Ring

const HeroSection = () => {
    const navigate = useNavigate();
    const [imagesReady, setImagesReady] = useState(false);

    // Retrieve active product catalog from Redux if available
    const { products } = useSelector((store) => store);
    const allProductsList = Array.isArray(products?.products?.content)
        ? products.products.content
        : (Array.isArray(products?.products) ? products.products : []);

    // Dynamically resolve product IDs with exact fallbacks
    const braceletProduct = allProductsList.find((p) =>
        p?._id === DEFAULT_BRACELET_ID ||
        (p?.title && p.title.toLowerCase().includes('heart shape diamond tennis bracelet')) ||
        (p?.title && p.title.toLowerCase().includes('tennis bracelet'))
    );
    const braceletId = braceletProduct?._id || DEFAULT_BRACELET_ID;

    const earringProduct = allProductsList.find((p) =>
        p?._id === DEFAULT_EARRING_ID ||
        (p?.title && p.title.toLowerCase().includes('gg buckle'))
    );
    const earringId = earringProduct?._id || DEFAULT_EARRING_ID;

    const ringProduct = allProductsList.find((p) =>
        p?._id === DEFAULT_RING_ID ||
        (p?.title && p.title.toLowerCase().includes('infinity diamond ring'))
    );
    const ringId = ringProduct?._id || DEFAULT_RING_ID;

    const handleProductNavigate = (productId) => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate(`/product/${productId}`);
    };

    // Preload hero panel images for instant smooth entrance
    useEffect(() => {
        const imageUrls = [
            '/hero_panel_1.webp',
            '/hero_panel_2.webp',
            '/hero_panel_3.webp'
        ];
        let loadedCount = 0;
        let isMounted = true;

        const checkAllLoaded = () => {
            loadedCount += 1;
            if (loadedCount >= imageUrls.length && isMounted) {
                setTimeout(() => {
                    if (isMounted) setImagesReady(true);
                }, 80);
            }
        };

        imageUrls.forEach((src) => {
            const img = new Image();
            img.src = src;
            if (img.complete) {
                checkAllLoaded();
            } else {
                img.onload = checkAllLoaded;
                img.onerror = checkAllLoaded;
            }
        });

        const fallbackTimer = setTimeout(() => {
            if (isMounted) setImagesReady(true);
        }, 1200);

        return () => {
            isMounted = false;
            clearTimeout(fallbackTimer);
        };
    }, []);

    return (
        <Box
            component="section"
            sx={{
                width: '100%',
                overflow: 'hidden',
                bgcolor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* ============================================================== */}
            {/* RESPONSIVE HERO STAGE (Aspect 1717 / 916 across all screens)  */}
            {/* ============================================================== */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '1920px',
                    aspectRatio: '1717 / 916',
                    maxHeight: {
                        xs: 'none',
                        md: 'calc(100dvh - 108px)'
                    },
                    display: 'flex',
                    alignItems: 'center',
                    userSelect: 'none',
                    overflow: 'hidden',
                }}
                role="region"
                aria-label="Loupe Fine Jewellery Hero Showcase"
            >
                {/* 3-PANEL HIGH-RES ANIMATED SIGNATURE COLLAGE */}
                <Box
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        gap: { xs: '3px', sm: '5px', md: '8px', lg: '12px' },
                        bgcolor: '#ffffff',
                        p: { xs: '2px', sm: '3px', md: '5px', lg: '6px' },
                        boxSizing: 'border-box',
                    }}
                >
                    {/* Panel 1: Left (Heart Shape Diamond Tennis Bracelet) */}
                    <Box
                        component={motion.div}
                        initial="hidden"
                        animate={imagesReady ? "visible" : "hidden"}
                        variants={panel1Variants}
                        onClick={() => handleProductNavigate(braceletId)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleProductNavigate(braceletId);
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label="View Heart Shape Diamond Tennis Bracelet Product Details"
                        sx={{
                            width: '49.5%',
                            height: '100%',
                            overflow: 'hidden',
                            position: 'relative',
                            bgcolor: '#f8fafc',
                            cursor: 'pointer',
                            outline: 'none',
                            '&:focus-visible': {
                                outline: '2px solid #092b4f',
                                outlineOffset: '2px',
                            },
                            '&:hover img': {
                                transform: 'scale(1.025)',
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src="/hero_panel_1.webp"
                            loading="eager"
                            fetchpriority="high"
                            alt="Heart Shape Diamond Tennis Bracelet - Loupe Jewellery"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                display: 'block',
                                transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                            }}
                        />
                    </Box>

                    {/* Right Stack: Panel 2 (Earrings) & Panel 3 (Ring) */}
                    <Box
                        sx={{
                            width: '49.5%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: { xs: '3px', sm: '5px', md: '8px', lg: '12px' },
                        }}
                    >
                        {/* Panel 2: Top Right (GG Buckle Diamond Stud Earrings) */}
                        <Box
                            component={motion.div}
                            initial="hidden"
                            animate={imagesReady ? "visible" : "hidden"}
                            variants={panel2Variants}
                            onClick={() => handleProductNavigate(earringId)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleProductNavigate(earringId);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label="View GG Buckle Diamond Stud Earrings Product Details"
                            sx={{
                                width: '100%',
                                height: '49.2%',
                                overflow: 'hidden',
                                position: 'relative',
                                bgcolor: '#f8fafc',
                                cursor: 'pointer',
                                outline: 'none',
                                '&:focus-visible': {
                                    outline: '2px solid #092b4f',
                                    outlineOffset: '2px',
                                },
                                '&:hover img': {
                                    transform: 'scale(1.03)',
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src="/hero_panel_2.webp"
                                loading="eager"
                                fetchpriority="high"
                                alt="GG Buckle Diamond Stud Earrings - Loupe Jewellery"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    display: 'block',
                                    transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                                }}
                            />
                        </Box>

                        {/* Panel 3: Bottom Right (Infinity Diamond Ring) */}
                        <Box
                            component={motion.div}
                            initial="hidden"
                            animate={imagesReady ? "visible" : "hidden"}
                            variants={panel3Variants}
                            onClick={() => handleProductNavigate(ringId)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleProductNavigate(ringId);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label="View Infinity Diamond Ring Product Details"
                            sx={{
                                width: '100%',
                                height: '49.2%',
                                overflow: 'hidden',
                                position: 'relative',
                                bgcolor: '#f8fafc',
                                cursor: 'pointer',
                                outline: 'none',
                                '&:focus-visible': {
                                    outline: '2px solid #092b4f',
                                    outlineOffset: '2px',
                                },
                                '&:hover img': {
                                    transform: 'scale(1.03)',
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src="/hero_panel_3.webp"
                                loading="eager"
                                fetchpriority="high"
                                alt="Infinity Diamond Ring - Loupe Jewellery"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    display: 'block',
                                    transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* ============================================================== */}
            {/* LUXURY VALUE PROPOSITION STRIP (Responsive for all screens)    */}
            {/* ============================================================== */}
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '1920px',
                    bgcolor: '#ffffff',
                    borderBottom: '1px solid #f1f5f9',
                    py: { xs: 1.4, sm: 2, md: 2.4 },
                    px: { xs: 1.5, sm: 3, md: 4 },
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: { xs: 0.8, sm: 2, md: 3 },
                }}
            >
                {/* 1. Timeless Designs */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: { xs: 'center', sm: 'left' },
                        gap: { xs: 0.5, sm: 1.2 },
                    }}
                >
                    <Box sx={{ color: '#092b4f', display: 'flex', alignItems: 'center' }}>
                        <Gem size={19} strokeWidth={1.8} />
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: { xs: '0.62rem', sm: '0.74rem', md: '0.8rem' },
                                fontWeight: 800,
                                letterSpacing: '0.04em',
                                color: '#092b4f',
                                textTransform: 'uppercase',
                                lineHeight: 1.2,
                            }}
                        >
                            TIMELESS<br className="sm:hidden" /> DESIGNS
                        </Typography>
                        <Typography
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: { sm: '0.66rem', md: '0.72rem' },
                                color: '#64748b',
                                lineHeight: 1.3,
                            }}
                        >
                            Crafted for life’s moments
                        </Typography>
                    </Box>
                </Box>

                {/* 2. Premium Craft */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: { xs: 'center', sm: 'left' },
                        gap: { xs: 0.5, sm: 1.2 },
                        borderLeft: '1px solid #f1f5f9',
                        borderRight: '1px solid #f1f5f9',
                    }}
                >
                    <Box sx={{ color: '#092b4f', display: 'flex', alignItems: 'center' }}>
                        <ShieldCheck size={19} strokeWidth={1.8} />
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: { xs: '0.62rem', sm: '0.74rem', md: '0.8rem' },
                                fontWeight: 800,
                                letterSpacing: '0.04em',
                                color: '#092b4f',
                                textTransform: 'uppercase',
                                lineHeight: 1.2,
                            }}
                        >
                            PREMIUM<br className="sm:hidden" /> CRAFT
                        </Typography>
                        <Typography
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: { sm: '0.66rem', md: '0.72rem' },
                                color: '#64748b',
                                lineHeight: 1.3,
                            }}
                        >
                            100% Certified Diamonds
                        </Typography>
                    </Box>
                </Box>

                {/* 3. Perfect Gifts */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: { xs: 'center', sm: 'left' },
                        gap: { xs: 0.5, sm: 1.2 },
                    }}
                >
                    <Box sx={{ color: '#092b4f', display: 'flex', alignItems: 'center' }}>
                        <Gift size={19} strokeWidth={1.8} />
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: { xs: '0.62rem', sm: '0.74rem', md: '0.8rem' },
                                fontWeight: 800,
                                letterSpacing: '0.04em',
                                color: '#092b4f',
                                textTransform: 'uppercase',
                                lineHeight: 1.2,
                            }}
                        >
                            PERFECT<br className="sm:hidden" /> GIFTS
                        </Typography>
                        <Typography
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: { sm: '0.66rem', md: '0.72rem' },
                                color: '#64748b',
                                lineHeight: 1.3,
                            }}
                        >
                            Signature packaging
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HeroSection;

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Gem, ShieldCheck, Gift } from 'lucide-react';

const panel1Variants = {
    hidden: { opacity: 0, scale: 1.06, x: -30 },
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
    }
};

const panel2Variants = {
    hidden: { opacity: 0, scale: 1.06, y: -25 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.95, delay: 0.25, ease: [0.22, 1, 0.36, 1] }
    }
};

const panel3Variants = {
    hidden: { opacity: 0, scale: 1.06, y: 25 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.95, delay: 0.45, ease: [0.22, 1, 0.36, 1] }
    }
};

const HeroSection = () => {
    const navigate = useNavigate();
    const [imagesReady, setImagesReady] = useState(false);

    useEffect(() => {
        const imageUrls = ['/hero_panel_1.webp', '/hero_panel_2.webp', '/hero_panel_3.webp'];
        let loadedCount = 0;
        let isMounted = true;

        const checkAllLoaded = () => {
            loadedCount += 1;
            if (loadedCount >= imageUrls.length && isMounted) {
                setTimeout(() => {
                    if (isMounted) setImagesReady(true);
                }, 120);
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
        <Box component="section" sx={{ width: '100%', overflow: 'hidden', bgcolor: '#c2d8f2' }}>
            {/* ============================================================== */}
            {/* 1. DESKTOP VIEW (md and up: 1717 / 916 aspect ratio)          */}
            {/* ============================================================== */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    width: '100%',
                    position: 'relative',
                    alignItems: 'center',
                    justifyContent: 'center',
                    maxHeight: 'calc(100dvh - 108px)'
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '1920px',
                        aspectRatio: '1717 / 916',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {/* 3-Panel High-Resolution Animated Hero Collage */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            gap: '0.8%',
                            bgcolor: '#ffffff',
                            p: '0.4%',
                            pointerEvents: 'none',
                        }}
                    >
                        {/* Panel 1: Left (Bracelet) */}
                        <Box
                            component={motion.div}
                            initial="hidden"
                            animate={imagesReady ? "visible" : "hidden"}
                            variants={panel1Variants}
                            sx={{
                                width: '49.5%',
                                height: '100%',
                                overflow: 'hidden',
                                position: 'relative',
                            }}
                        >
                            <Box
                                component="img"
                                src="/hero_panel_1.webp"
                                loading="eager"
                                fetchPriority="high"
                                alt="Fine Diamond Bracelet"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />
                        </Box>

                        {/* Right Stack: Panel 2 (Earring) & Panel 3 (Ring) */}
                        <Box
                            sx={{
                                width: '49.5%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.6%',
                            }}
                        >
                            {/* Panel 2: Top Right (Earring) */}
                            <Box
                                component={motion.div}
                                initial="hidden"
                                animate={imagesReady ? "visible" : "hidden"}
                                variants={panel2Variants}
                                sx={{
                                    width: '100%',
                                    height: '49.2%',
                                    overflow: 'hidden',
                                    position: 'relative',
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/hero_panel_2.webp"
                                    loading="eager"
                                    fetchPriority="high"
                                    alt="Geometric Diamond Earrings"
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block',
                                    }}
                                />
                            </Box>

                            {/* Panel 3: Bottom Right (Ring) */}
                            <Box
                                component={motion.div}
                                initial="hidden"
                                animate={imagesReady ? "visible" : "hidden"}
                                variants={panel3Variants}
                                sx={{
                                    width: '100%',
                                    height: '49.2%',
                                    overflow: 'hidden',
                                    position: 'relative',
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/hero_panel_3.webp"
                                    loading="eager"
                                    fetchPriority="high"
                                    alt="Infinity Diamond Ring"
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block',
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>

                    {/* Left Side Content with Animated Entrance */}
                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 2,
                            width: { md: '50%', lg: '46%' },
                            pl: { md: '3.5%', lg: '4%' },
                            pr: { md: '2%' },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            userSelect: 'none',
                        }}
                    >
                        {/* 1. Subtitle */}
                        {/* <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)',
                                    fontWeight: 700,
                                    letterSpacing: '0.26em',
                                    color: '#163b5f',
                                    textTransform: 'uppercase',
                                    mb: 1.2,
                                }}
                            >
                                TIMELESS BEAUTY
                            </Typography>
                        </motion.div> */}

                        {/* 2. Main Headline */}
                        {/* <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Typography
                                component="h1"
                                sx={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: {
                                        md: 'clamp(2.1rem, 3.5vw, 3.4rem)',
                                        lg: 'clamp(2.6rem, 3.4vw, 4.2rem)'
                                    },
                                    fontWeight: 700,
                                    lineHeight: 1.1,
                                    color: '#092b4f',
                                    mb: 1.6,
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                Crafted for<br />
                                Life’s Brighter<br />
                                Moments
                            </Typography>
                        </motion.div> */}

                        {/* 3. Decorative Accent Line */}
                        {/* <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: '42px', opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
                        >
                            <Box
                                sx={{
                                    height: '2px',
                                    width: '44px',
                                    bgcolor: '#2b5a88',
                                    mb: 1.5,
                                    borderRadius: '2px',
                                }}
                            />
                        </motion.div> */}

                        {/* 4. Sub-paragraph */}
                        {/* <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
                                    fontWeight: 400,
                                    lineHeight: 1.45,
                                    color: '#1c3d5e',
                                    maxWidth: '440px',
                                    mb: 2.8,
                                }}
                            >
                                Fine jewellery that celebrates your today,
                                <br />tomorrow and always.
                            </Typography>
                        </motion.div> */}

                        {/* 5. Explore Collection CTA Button */}
                        {/* <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 14 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Box
                                component="button"
                                onClick={() => navigate('/all-jewellery')}
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 1.4,
                                    bgcolor: '#0b2f53',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '9999px',
                                    px: 3.4,
                                    py: 1.1,
                                    fontSize: '0.84rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    boxShadow: '0 6px 20px rgba(11, 47, 83, 0.28)',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        bgcolor: '#194c7c',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 10px 24px rgba(25, 76, 124, 0.38)',
                                        '& .hero-cta-arrow': {
                                            transform: 'translateX(4px)',
                                        }
                                    },
                                    '&:active': {
                                        transform: 'translateY(0)',
                                    }
                                }}
                            >
                                <span>EXPLORE COLLECTION</span>
                                <ArrowRight
                                    className="hero-cta-arrow"
                                    size={15}
                                    style={{ transition: 'transform 0.3s ease' }}
                                />
                            </Box>
                        </motion.div> */}

                        {/* 6. Three Value Proposition Badges */}
                        {/* <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                            style={{ width: '100%' }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: { md: 3, lg: 4 },
                                    mt: { md: 3, lg: 4 },
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ color: '#092b4f', display: 'flex', alignItems: 'center' }}>
                                        <Gem size={17} strokeWidth={1.8} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em', color: '#092b4f', textTransform: 'uppercase', lineHeight: 1.2 }}>
                                            TIMELESS
                                        </Typography>
                                        <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em', color: '#092b4f', textTransform: 'uppercase', lineHeight: 1.2 }}>
                                            DESIGNS
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ color: '#092b4f', display: 'flex', alignItems: 'center' }}>
                                        <ShieldCheck size={17} strokeWidth={1.8} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em', color: '#092b4f', textTransform: 'uppercase', lineHeight: 1.2 }}>
                                            PREMIUM
                                        </Typography>
                                        <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em', color: '#092b4f', textTransform: 'uppercase', lineHeight: 1.2 }}>
                                            CRAFTSMANSHIP
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ color: '#092b4f', display: 'flex', alignItems: 'center' }}>
                                        <Gift size={17} strokeWidth={1.8} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em', color: '#092b4f', textTransform: 'uppercase', lineHeight: 1.2 }}>
                                            PERFECT
                                        </Typography>
                                        <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em', color: '#092b4f', textTransform: 'uppercase', lineHeight: 1.2 }}>
                                            FOR EVERY OCCASION
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </motion.div> */}
                    </Box>
                </Box>
            </Box>

            {/* ============================================================== */}
            {/* 2. MOBILE VIEW (xs & sm: 3 / 4 Portrait ratio)                 */}
            {/* ============================================================== */}
            <Box
                sx={{
                    display: { xs: 'block', md: 'none' },
                    width: '100%',
                    position: 'relative',
                }}
            >
                {/* 3:4 Aspect Ratio Stage Wrapper */}
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '3 / 4',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* Portrait Mobile Banner Image */}
                    <Box
                        component="img"
                        src="https://res.cloudinary.com/djb2szzn/image/upload/v1790178973/loupe_mobile_banner2.jpg"
                        alt="Loupe Jeweller - Crafted for Life’s Brighter Moments"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center top',
                            display: 'block',
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Top Text Overlay Container (Over open sunlit sky area, leaves jewellery free) */}
                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 2,
                            width: '100%',
                            pt: { xs: 2.5, sm: 3.5 },
                            pb: { xs: 2, sm: 3 },
                            px: { xs: 2.5, sm: 4 },
                            background: 'linear-gradient(180deg, rgba(194, 216, 242, 0.92) 0%, rgba(194, 216, 242, 0.6) 65%, rgba(194, 216, 242, 0) 100%)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        {/* Subtitle */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontSize: { xs: '0.62rem', sm: '0.72rem' },
                                    fontWeight: 800,
                                    letterSpacing: '0.22em',
                                    color: '#0b2f53',
                                    textTransform: 'uppercase',
                                    mb: 0.4,
                                }}
                            >
                                ✦ TIMELESS BEAUTY ✦
                            </Typography>
                        </motion.div>

                        {/* Headline */}
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Typography
                                component="h1"
                                sx={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: { xs: '1.35rem', sm: '1.75rem' },
                                    fontWeight: 700,
                                    lineHeight: 1.15,
                                    color: '#092b4f',
                                    mb: 0.6,
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                Crafted for Life’s<br />Brighter Moments
                            </Typography>
                        </motion.div>

                        {/* Decorative Accent Line */}
                        <Box
                            sx={{
                                height: '2px',
                                width: '28px',
                                bgcolor: '#2b5a88',
                                mb: 0.8,
                                borderRadius: '2px',
                                opacity: 0.85,
                            }}
                        />

                        {/* Subtext */}
                        {/* <Typography
                            sx={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: { xs: '0.68rem', sm: '0.8rem' },
                                fontWeight: 500,
                                color: '#1c3d5e',
                                maxWidth: '280px',
                                lineHeight: 1.35,
                            }}
                        >
                            Fine jewellery that celebrates your today, tomorrow & always.
                        </Typography> */}
                    </Box>

                    {/* Bottom CTA Button (Anchored at the bottom of the mobile banner) */}
                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 2,
                            width: '100%',
                            pb: { xs: 2.4, sm: 3.5 },
                            pt: 3,
                            display: 'flex',
                            justifyContent: 'center',
                            background: 'linear-gradient(0deg, rgba(194, 216, 242, 0.9) 0%, rgba(194, 216, 242, 0.45) 50%, rgba(194, 216, 242, 0) 100%)',
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Box
                                component="button"
                                onClick={() => navigate('/all-jewellery')}
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 1.2,
                                    bgcolor: '#0b2f53',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '9999px',
                                    px: { xs: 3, sm: 3.6 },
                                    py: { xs: 0.95, sm: 1.1 },
                                    fontSize: { xs: '0.76rem', sm: '0.84rem' },
                                    fontWeight: 700,
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 24px rgba(11, 47, 83, 0.36)',
                                    transition: 'all 0.25s ease',
                                    '&:active': {
                                        transform: 'scale(0.96)',
                                    },
                                    '& .hero-cta-arrow': {
                                        transition: 'transform 0.25s ease',
                                    },
                                    '&:hover .hero-cta-arrow': {
                                        transform: 'translateX(4px)',
                                    }
                                }}
                            >
                                <span>EXPLORE COLLECTION</span>
                                <ArrowRight className="hero-cta-arrow" size={14} />
                            </Box>
                        </motion.div>
                    </Box>
                </Box>

                {/* Mobile Value Proposition Strip (Placed directly below image for 100% readability) */}
                <Box
                    sx={{
                        width: '100%',
                        bgcolor: '#ffffff',
                        borderBottom: '1px solid #e2e8f0',
                        py: 1.6,
                        px: 1,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 1,
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 0.5 }}>
                        <Box sx={{ color: '#092b4f' }}>
                            <Gem size={18} strokeWidth={1.8} />
                        </Box>
                        <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.04em', color: '#092b4f', textTransform: 'uppercase', lineHeight: 1.2 }}>
                            TIMELESS<br />DESIGNS
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 0.5, borderLeft: '1px solid #f1f5f9', borderRight: '1px solid #f1f5f9' }}>
                        <Box sx={{ color: '#092b4f' }}>
                            <ShieldCheck size={18} strokeWidth={1.8} />
                        </Box>
                        <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.04em', color: '#092b4f', textTransform: 'uppercase', lineHeight: 1.2 }}>
                            PREMIUM<br />CRAFT
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 0.5 }}>
                        <Box sx={{ color: '#092b4f' }}>
                            <Gift size={18} strokeWidth={1.8} />
                        </Box>
                        <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.04em', color: '#092b4f', textTransform: 'uppercase', lineHeight: 1.2 }}>
                            PERFECT<br />GIFTS
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HeroSection;

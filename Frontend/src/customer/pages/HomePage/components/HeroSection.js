import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Gem, ShieldCheck, Gift, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

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

const HeroSection = () => {
    const navigate = useNavigate();
    const [imagesReady, setImagesReady] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0); // 0: The Diwali Edit, 1: Signature Collection
    const [isPaused, setIsPaused] = useState(false);
    
    // Touch swipe handling
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);

    // Preload hero images
    useEffect(() => {
        const imageUrls = [
            '/diwali_banner_hero.webp',
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

    // 2-Slide Auto-Rotation Timer (6.5s per slide)
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev === 0 ? 1 : 0));
        }, 6500);

        return () => clearInterval(timer);
    }, [isPaused, activeSlide]);

    const handlePrev = (e) => {
        e?.stopPropagation();
        setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    };

    const handleNext = (e) => {
        e?.stopPropagation();
        setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const diff = touchStartX.current - touchEndX.current;
        if (diff > 45) {
            handleNext();
        } else if (diff < -45) {
            handlePrev();
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

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
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* ============================================================== */}
            {/* RESPONSIVE HERO STAGE (Aspect 1717 / 916 across all screens)  */}
            {/* ============================================================== */}
            <Box
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
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
                    cursor: 'pointer',
                    userSelect: 'none',
                    overflow: 'hidden',
                }}
                role="region"
                aria-label="Loupe Fine Jewellery Hero Showcase"
            >
                {/* Cross-Fade Slide Container */}
                <AnimatePresence mode="wait">
                    {activeSlide === 0 ? (
                        /* ====================================================== */
                        /* SLIDE 1: THE DIWALI EDIT FESTIVE BANNER                */
                        /* ====================================================== */
                        <Box
                            key="diwali-slide"
                            component={motion.div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            onClick={() => navigate('/all-jewellery?occasion=festive')}
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                bgcolor: '#f7f5f1',
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                component="img"
                                src="/diwali_banner_hero.webp"
                                alt="The Diwali Edit - Let Your Festive Glow Begin - Loupe Jewellery"
                                loading="eager"
                                fetchPriority="high"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    display: 'block',
                                    transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                                    '&:hover': {
                                        transform: 'scale(1.015)',
                                    },
                                }}
                            />

                            {/* Shop Now CTA Button on Left Content Area */}
                            <Box
                                component={motion.button}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate('/all-jewellery?occasion=festive');
                                }}
                                aria-label="Shop Diwali Collection"
                                sx={{
                                    position: 'absolute',
                                    left: '8.57%',
                                    top: { xs: '68%', sm: '69%', md: '69.5%' },
                                    zIndex: 10,
                                    bgcolor: '#092b4f', // Deep regal navy matching banner text
                                    color: '#ffffff',
                                    px: { xs: 1.8, sm: 3, md: 4.2 },
                                    py: { xs: 0.45, sm: 0.8, md: 1.2 },
                                    borderRadius: '9999px',
                                    fontSize: { xs: '0.52rem', sm: '0.7rem', md: '0.84rem' },
                                    fontWeight: 700,
                                    letterSpacing: { xs: '0.1em', sm: '0.14em', md: '0.16em' },
                                    textTransform: 'uppercase',
                                    border: 'none',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: { xs: 0.5, sm: 1 },
                                    boxShadow: '0 4px 18px rgba(9, 43, 79, 0.28)',
                                    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                                    whiteSpace: 'nowrap',
                                    '&:hover': {
                                        bgcolor: '#3c7399',
                                        boxShadow: '0 8px 25px rgba(60, 115, 153, 0.42)',
                                    }
                                }}
                            >
                                <span>Shop Now</span>
                                <span style={{ fontSize: '1.15em', lineHeight: 1 }}>→</span>
                            </Box>
                        </Box>
                    ) : (
                        /* ====================================================== */
                        /* SLIDE 2: 3-PANEL HIGH-RES ANIMATED SIGNATURE COLLAGE    */
                        /* ====================================================== */
                        <Box
                            key="signature-slide"
                            component={motion.div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            onClick={() => navigate('/all-jewellery')}
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                gap: { xs: '3px', sm: '5px', md: '8px', lg: '12px' },
                                bgcolor: '#ffffff',
                                p: { xs: '2px', sm: '3px', md: '5px', lg: '6px' },
                                boxSizing: 'border-box',
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
                                    bgcolor: '#f8fafc',
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/hero_panel_1.webp"
                                    loading="eager"
                                    fetchPriority="high"
                                    alt="Fine Diamond Bracelet - Loupe Jewellery"
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        display: 'block',
                                        transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                                        '&:hover': {
                                            transform: 'scale(1.025)',
                                        },
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
                                    gap: { xs: '3px', sm: '5px', md: '8px', lg: '12px' },
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
                                        bgcolor: '#f8fafc',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src="/hero_panel_2.webp"
                                        loading="eager"
                                        fetchPriority="high"
                                        alt="Geometric Diamond Earrings - Loupe Jewellery"
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'center',
                                            display: 'block',
                                            transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                                            '&:hover': {
                                                transform: 'scale(1.03)',
                                            },
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
                                        bgcolor: '#f8fafc',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src="/hero_panel_3.webp"
                                        loading="eager"
                                        fetchPriority="high"
                                        alt="Infinity Diamond Ring - Loupe Jewellery"
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'center',
                                            display: 'block',
                                            transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                                            '&:hover': {
                                                transform: 'scale(1.03)',
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    )}
                </AnimatePresence>

                {/* Left Arrow Button (Desktop Hover) */}
                <Box
                    component="button"
                    onClick={handlePrev}
                    aria-label="Previous Slide"
                    sx={{
                        position: 'absolute',
                        left: { xs: 8, md: 16 },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 12,
                        width: { xs: 30, sm: 36, md: 42 },
                        height: { xs: 30, sm: 36, md: 42 },
                        borderRadius: '50%',
                        bgcolor: 'rgba(255, 255, 255, 0.78)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        color: '#092b4f',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                        opacity: { xs: 0.7, md: 0 },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '.MuiBox-root:hover > &': {
                            opacity: 1,
                        },
                        '&:hover': {
                            bgcolor: '#092b4f',
                            color: '#ffffff',
                            transform: 'translateY(-50%) scale(1.08)',
                        },
                    }}
                >
                    <ChevronLeft size={20} />
                </Box>

                {/* Right Arrow Button (Desktop Hover) */}
                <Box
                    component="button"
                    onClick={handleNext}
                    aria-label="Next Slide"
                    sx={{
                        position: 'absolute',
                        right: { xs: 8, md: 16 },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 12,
                        width: { xs: 30, sm: 36, md: 42 },
                        height: { xs: 30, sm: 36, md: 42 },
                        borderRadius: '50%',
                        bgcolor: 'rgba(255, 255, 255, 0.78)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        color: '#092b4f',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                        opacity: { xs: 0.7, md: 0 },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '.MuiBox-root:hover > &': {
                            opacity: 1,
                        },
                        '&:hover': {
                            bgcolor: '#092b4f',
                            color: '#ffffff',
                            transform: 'translateY(-50%) scale(1.08)',
                        },
                    }}
                >
                    <ChevronRight size={20} />
                </Box>

                {/* ============================================================== */}
                {/* ELEGANT MINIMAL SLIDE DOTS (Bottom Center)                    */}
                {/* ============================================================== */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: { xs: 8, sm: 12, md: 16 },
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 14,
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 0.8, sm: 1 },
                        bgcolor: 'rgba(255, 255, 255, 0.75)',
                        backdropFilter: 'blur(8px)',
                        px: { xs: 1, sm: 1.2 },
                        py: { xs: 0.5, sm: 0.6 },
                        borderRadius: '9999px',
                        boxShadow: '0 2px 10px rgba(9, 43, 79, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                    }}
                >
                    {[0, 1].map((index) => (
                        <Box
                            key={index}
                            component="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveSlide(index);
                            }}
                            aria-label={`Slide ${index + 1}`}
                            sx={{
                                width: activeSlide === index ? { xs: 18, sm: 24 } : { xs: 6, sm: 7 },
                                height: { xs: 6, sm: 7 },
                                borderRadius: '9999px',
                                bgcolor: activeSlide === index ? '#092b4f' : 'rgba(9, 43, 79, 0.28)',
                                border: 'none',
                                outline: 'none',
                                p: 0,
                                cursor: 'pointer',
                                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    bgcolor: activeSlide === index ? '#092b4f' : '#3c7399',
                                },
                            }}
                        />
                    ))}
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

import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip, IconButton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// ============================================================================
// 🪔 DIWALI FESTIVAL DIYA SETTINGS
// Set SHOW_DIWALI_DIYA = false after the festival to hide the Diya.
// Set DIYA_LAYOUT = 'column' if you prefer the Diya stacked above WhatsApp.
// ============================================================================
export const SHOW_DIWALI_DIYA = true;
export const DIYA_LAYOUT = 'row'; // 'row' (side-by-side before WhatsApp) or 'column' (above WhatsApp)

// ============================================================================
// LUXURY TRADITIONAL GOLDEN DIYA WITH ANIMATED FLICKERING FLAME
// ============================================================================
const FestiveDiyaIcon = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <svg
                viewBox="0 0 100 100"
                style={{ width: '100%', height: '100%', overflow: 'visible' }}
            >
                <defs>
                    {/* Golden Brass Gradient for Lamp Body */}
                    <linearGradient id="goldDiyaBody" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fff3b0" />
                        <stop offset="35%" stopColor="#d4af37" />
                        <stop offset="75%" stopColor="#aa820a" />
                        <stop offset="100%" stopColor="#634700" />
                    </linearGradient>

                    {/* Rim Highlight Gradient */}
                    <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#e5c158" />
                        <stop offset="50%" stopColor="#fff7c2" />
                        <stop offset="100%" stopColor="#c99718" />
                    </linearGradient>

                    {/* Radial Flame Glow */}
                    <radialGradient id="diyaFlameGradient" cx="50%" cy="65%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="25%" stopColor="#fff275" />
                        <stop offset="65%" stopColor="#ff7b00" />
                        <stop offset="100%" stopColor="#d82600" />
                    </radialGradient>

                    {/* Soft Ambient Halo Filter */}
                    <filter id="flameHalo" x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" />
                    </filter>
                </defs>

                {/* Pedestal Base */}
                <ellipse cx="50" cy="85" rx="16" ry="3.5" fill="#523900" />
                <path d="M37 83 Q50 86 63 83 L61 80 Q50 82 39 80 Z" fill="url(#goldDiyaBody)" />

                {/* Diya Bowl (Petal-carved traditional deepak) */}
                <path
                    d="M17 64 C19 78 34 84 50 84 C66 84 81 78 83 64 C84 62 81 62 77 63 C65 67 35 67 23 63 C19 62 16 62 17 64 Z"
                    fill="url(#goldDiyaBody)"
                />

                {/* Rim & Oil Pool */}
                <ellipse cx="50" cy="63" rx="33" ry="6" fill="url(#goldRim)" stroke="#876204" strokeWidth="0.8" />
                <ellipse cx="50" cy="63" rx="28" ry="4.5" fill="#4d2f00" />

                {/* Lotus Petal Embellishments on Bowl */}
                <path d="M32 66 Q36 78 50 80 Q64 78 68 66" fill="none" stroke="#fff1a8" strokeWidth="1.2" opacity="0.75" />
                <path d="M41 67 Q45 80 50 82 Q55 80 59 67" fill="none" stroke="#fff1a8" strokeWidth="1.2" opacity="0.85" />

                {/* Wick */}
                <line x1="50" y1="63" x2="50" y2="55" stroke="#1f1000" strokeWidth="2.5" strokeLinecap="round" />

                {/* Pulsing Ambient Halo */}
                <motion.circle
                    cx="50"
                    cy="38"
                    r="19"
                    fill="#ffb300"
                    opacity={0.35}
                    filter="url(#flameHalo)"
                    animate={{
                        scale: [1, 1.25, 0.95, 1.18, 1],
                        opacity: [0.3, 0.52, 0.35, 0.48, 0.3]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.8,
                        ease: "easeInOut"
                    }}
                />

                {/* Animated Dancing Flame */}
                <motion.g
                    style={{ transformOrigin: "50px 55px" }}
                    animate={{
                        scaleY: [1, 1.12, 0.94, 1.08, 0.98, 1],
                        scaleX: [1, 0.95, 1.05, 0.96, 1.03, 1],
                        rotate: [0, -2, 2.2, -1.2, 1.5, 0],
                        y: [0, -1.3, 0.7, -0.9, 0.5, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.3,
                        ease: "easeInOut"
                    }}
                >
                    {/* Outer Saffron/Gold Flame */}
                    <path
                        d="M50 16 C41 32 39 45 44 54 C46 58 54 58 56 54 C61 45 59 32 50 16 Z"
                        fill="url(#diyaFlameGradient)"
                    />
                    {/* Inner Core Flame */}
                    <path
                        d="M50 30 C46 39 45 47 47 52 C48 54 52 54 53 52 C55 47 54 39 50 30 Z"
                        fill="#ffffff"
                        opacity="0.95"
                    />
                </motion.g>
            </svg>
        </Box>
    );
};

const WhatsAppContact = () => {
    const navigate = useNavigate();
    const phoneNumber = "919909109074"; // Verified contact number
    const message = encodeURIComponent("Hello Loupe Jewellery! I'm interested in your collections.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    const handleDiyaClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate('/all-jewellery?occasion=festive');
    };

    return (
        <Box
            component={motion.div}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1.5
            }}
            sx={{
                position: 'fixed',
                bottom: { xs: '18px', sm: '30px' },
                right: { xs: '18px', sm: '30px' },
                zIndex: 1000,
                display: 'flex',
                flexDirection: DIYA_LAYOUT === 'column' ? 'column' : 'row',
                alignItems: 'center',
                gap: { xs: '10px', sm: '14px' }
            }}
        >
            {/* ============================================================== */}
            {/* 1. FESTIVE DIWALI DIYA (BEFORE WHATSAPP ICON)                  */}
            {/* ============================================================== */}
            {SHOW_DIWALI_DIYA && (
                <Tooltip title="Happy Diwali! 🪔 Explore Festive Collection" placement="top" arrow>
                    <Box
                        component={motion.div}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                    >
                        <IconButton
                            onClick={handleDiyaClick}
                            aria-label="Diwali Festive Collection"
                            sx={{
                                width: { xs: 50, sm: 65 },
                                height: { xs: 50, sm: 65 },
                                bgcolor: '#092b4f', // Deep luxury navy
                                color: 'white',
                                boxShadow: '0 8px 30px rgba(212, 175, 55, 0.45)', // Warm gold glow
                                border: { xs: '3px solid #d4af37', sm: '4px solid #d4af37' },
                                position: 'relative',
                                overflow: 'visible',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    bgcolor: '#0d3866',
                                    boxShadow: '0 12px 42px rgba(255, 180, 0, 0.75)',
                                    border: { xs: '3px solid #ffe680', sm: '4px solid #ffe680' },
                                }
                            }}
                        >
                            <FestiveDiyaIcon />
                        </IconButton>
                    </Box>
                </Tooltip>
            )}

            {/* ============================================================== */}
            {/* 2. WHATSAPP CHAT BUTTON                                        */}
            {/* ============================================================== */}
            <Tooltip title="Chat with Expertise" placement="top" arrow>
                <Box
                    component={motion.div}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                >
                    <IconButton
                        component="a"
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Chat on WhatsApp"
                        sx={{
                            width: { xs: 50, sm: 65 },
                            height: { xs: 50, sm: 65 },
                            bgcolor: '#25D366',
                            color: 'white',
                            boxShadow: '0 8px 32px rgba(37, 211, 102, 0.4)',
                            border: { xs: '3px solid white', sm: '4px solid white' },
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                bgcolor: '#128C7E',
                                boxShadow: '0 12px 40px rgba(37, 211, 102, 0.6)',
                            }
                        }}
                    >
                        <i className="fa-brands fa-whatsapp" style={{ fontSize: '26px' }}></i>
                    </IconButton>
                </Box>
            </Tooltip>
        </Box>
    );
};

export default WhatsAppContact;

import React, { useState, useEffect, useRef } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const slides = [
    {
        id: 1,
        overline: "THE LOUPE COLLECTION",
        title: "Timeless Elegance",
        titleItalic: "Redefined.",
        subtitle: "Discover handcrafted necklaces that capture the essence of luxury and sophistication.",
        image: "/product/Necklace.jpeg",
        buttonText: "Shop Collection",
        link: "/all-jewellery"
    },
    {
        id: 2,
        overline: "BRIDAL & COUTURE",
        title: "Crafted for Your",
        titleItalic: "Forever.",
        subtitle: "Stunning diamond engagement rings and bands that celebrate enduring love stories.",
        image: "/assets/images/slider/1.png",
        buttonText: "Explore Rings",
        link: "/all-jewellery"
    },
    {
        id: 3,
        overline: "ELEGANT STATEMENT PIECES",
        title: "Shine in Every",
        titleItalic: "Detail.",
        subtitle: "Contemporary earrings designed to make a statement from day to night.",
        image: "/assets/images/slider/2.jpg",
        buttonText: "View Earrings",
        link: "/all-jewellery"
    },
    {
        id: 4,
        overline: "BESPOKE MASTERPIECES",
        title: "Your Vision, Our",
        titleItalic: "Craft.",
        subtitle: "Collaborate with our master artisans to create a one-of-a-kind custom jewellery piece.",
        image: "/assets/images/slider/3.jpg",
        buttonText: "Book Consultation",
        link: "/all-jewellery"
    }
];

const HeroSection = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef(null);

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        if (!isHovered) {
            timeoutRef.current = setTimeout(nextSlide, 6000);
        }
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [current, isHovered]);

    return (
        <Box
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
                width: '100%',
                height: { xs: '75vh', md: '85vh' },
                position: 'relative',
                overflow: 'hidden',
                bgcolor: '#0f172a'
            }}
        >
            {/* Background Images with AnimatePresence for Smooth Crossfades */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 z-0"
                >
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url("${slides[current].image}")`,
                            filter: 'brightness(0.65)'
                        }}
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </motion.div>
            </AnimatePresence>

            {/* Slide Content with Staggered Element Transitions */}
            <div className="relative z-10 h-full mx-auto max-w-[1400px] flex items-center px-6 lg:px-12">
                <div className="max-w-[700px] w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.15
                                    }
                                },
                                exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
                            }}
                        >
                            {/* Overline Text */}
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 15 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                                }}
                            >
                                <Typography
                                    variant="overline"
                                    sx={{
                                        letterSpacing: 6,
                                        fontWeight: 700,
                                        color: '#755970',
                                        fontSize: { xs: '0.75rem', md: '0.85rem' },
                                        mb: 2,
                                        display: 'block'
                                    }}
                                >
                                    {slides[current].overline}
                                </Typography>
                            </motion.div>

                            {/* Main Title Heading */}
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
                                }}
                            >
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem' },
                                        fontWeight: 800,
                                        fontFamily: "'Playfair Display', serif",
                                        lineHeight: 1.1,
                                        color: '#ffffff',
                                        mb: 3
                                    }}
                                >
                                    {slides[current].title} <br />
                                    <span className="text-[#755970] italic font-light">
                                        {slides[current].titleItalic}
                                    </span>
                                </Typography>
                            </motion.div>

                            {/* Subtitle Description */}
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'rgba(255,255,255,0.75)',
                                        fontSize: { xs: '0.95rem', md: '1.15rem' },
                                        maxWidth: 550,
                                        mb: 5,
                                        lineHeight: 1.7
                                    }}
                                >
                                    {slides[current].subtitle}
                                </Typography>
                            </motion.div>

                            {/* Action CTA Button */}
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, scale: 0.95 },
                                    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
                                }}
                            >
                                <Button
                                    onClick={() => navigate(slides[current].link)}
                                    variant="contained"
                                    endIcon={<ArrowRight size={20} />}
                                    sx={{
                                        bgcolor: '#755970',
                                        color: 'white',
                                        px: { xs: 4, md: 5 },
                                        py: { xs: 1.5, md: 2 },
                                        borderRadius: '100px',
                                        fontSize: '0.9rem',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: 2,
                                        boxShadow: '0 10px 20px -5px rgba(117, 89, 112, 0.4)',
                                        '&:hover': {
                                            bgcolor: '#ffffff',
                                            color: '#0f172a',
                                            transform: 'translateY(-3px)',
                                            boxShadow: '0 15px 30px -5px rgba(0,0,0,0.3)',
                                        },
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    {slides[current].buttonText}
                                </Button>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Left and Right Manual Control Arrows (Fade In on Carousel Hover) */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 24,
                    transform: 'translateY(-50%)',
                    zIndex: 20,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out',
                    display: { xs: 'none', md: 'block' }
                }}
            >
                <button
                    onClick={prevSlide}
                    className="w-12 h-12 rounded-full border border-white/20 bg-black/30 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
                >
                    <ChevronLeft size={24} />
                </button>
            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: 24,
                    transform: 'translateY(-50%)',
                    zIndex: 20,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out',
                    display: { xs: 'none', md: 'block' }
                }}
            >
                <button
                    onClick={nextSlide}
                    className="w-12 h-12 rounded-full border border-white/20 bg-black/30 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
                >
                    <ChevronRight size={24} />
                </button>
            </Box>

            {/* Bottom Indicators with Visual Progress Lines */}
            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
                {slides.map((slide, idx) => (
                    <button
                        key={slide.id}
                        onClick={() => setCurrent(idx)}
                        className="group relative h-1.5 w-16 overflow-hidden rounded-full bg-white/30 transition-all duration-300"
                    >
                        {idx === current && (
                            <motion.div
                                key={idx + (isHovered ? "-paused" : "-active")}
                                initial={{ width: "0%" }}
                                animate={{ width: isHovered ? "100%" : "100%" }}
                                transition={{
                                    duration: isHovered ? 0 : 6,
                                    ease: "linear"
                                }}
                                className="absolute inset-0 bg-[#755970]"
                            />
                        )}
                        <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </button>
                ))}
            </div>

            {/* Subtle Gradient Fade at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f172a]/30 to-transparent pointer-events-none" />
        </Box>
    );
};

export default HeroSection;

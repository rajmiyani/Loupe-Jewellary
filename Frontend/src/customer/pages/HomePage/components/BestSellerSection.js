import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, IconButton, Button } from '@mui/material';
import BestSellerCard from './BestSellerCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const products = [
    {
        id: "1",
        title: "0.30 POINTER MARQUISE SHAPE DIAMOND RING | Loupe jeweler",
        price: 33500,
        discountedPrice: 31150,
        colors: [
            { colorName: 'Yellow Gold', colorCode: '#eab308', image: "https://images.unsplash.com/photo-1605100804763-247f67b3f41e?q=80&w=1000&auto=format&fit=crop" },
            { colorName: 'Rose Gold', colorCode: '#da8a8a', image: "https://images.unsplash.com/photo-1544441893-675973e31d85?q=80&w=1000&auto=format&fit=crop" },
            { colorName: 'White Gold', colorCode: '#f1f5f9', image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1000&auto=format&fit=crop" }
        ]
    },
    {
        id: "2",
        title: "0.50 CARAT LABGROWN DIAMOND ROUND SHAPE RING",
        price: 38000,
        discountedPrice: 35901,
        colors: [
            { colorName: 'Yellow Gold', colorCode: '#eab308', image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1000&auto=format&fit=crop" },
            { colorName: 'Rose Gold', colorCode: '#da8a8a', image: "https://images.unsplash.com/photo-1598560912005-5976593c6511?q=80&w=1000&auto=format&fit=crop" },
            { colorName: 'White Gold', colorCode: '#f1f5f9', image: "https://images.unsplash.com/photo-1599643477877-537ef5278533?q=80&w=1000&auto=format&fit=crop" }
        ]
    },
    {
        id: "3",
        title: "0.50 CTW ROUND DIAMOND ENGAGEMENT RING",
        price: 52000,
        discountedPrice: 49888,
        colors: [
            { colorName: 'Yellow Gold', colorCode: '#eab308', image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop" },
            { colorName: 'Rose Gold', colorCode: '#da8a8a', image: "https://images.unsplash.com/photo-1590548366035-77983637172f?q=80&w=1000&auto=format&fit=crop" },
            { colorName: 'White Gold', colorCode: '#f1f5f9', image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000&auto=format&fit=crop" }
        ]
    },
    {
        id: "4",
        title: "0.50 POINTER CLASSIC STYLE LAB GROWN DIAMOND RING FOR A BEAUTIFUL GIFT",
        price: 36000,
        discountedPrice: 34011,
        colors: [
            { colorName: 'Yellow Gold', colorCode: '#eab308', image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop" },
            { colorName: 'Rose Gold', colorCode: '#da8a8a', image: "https://images.unsplash.com/photo-1611085510590-09c063b46903?q=80&w=1000&auto=format&fit=crop" },
            { colorName: 'White Gold', colorCode: '#f1f5f9', image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1000&auto=format&fit=crop" }
        ]
    },
    {
        id: "5",
        title: "0.80 CARAT ROUND SOLITAIRE DIAMOND RING",
        price: 55000,
        discountedPrice: 49409,
        colors: [
            { colorName: 'Yellow Gold', colorCode: '#eab308', image: "https://images.unsplash.com/photo-1512401151675-bc87e7436043?q=80&w=1000&auto=format&fit=crop" },
            { colorName: 'Rose Gold', colorCode: '#da8a8a', image: "https://images.unsplash.com/photo-1598560912005-5976593c6511?q=80&w=1000&auto=format&fit=crop" },
            { colorName: 'White Gold', colorCode: '#f1f5f9', image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000&auto=format&fit=crop" }
        ]
    }
];

const NextArrow = ({ onClick }) => (
    <IconButton
        onClick={onClick}
        sx={{
            position: 'absolute',
            right: { xs: 0, md: -30 },
            top: '40%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            bgcolor: '#1e293b',
            color: 'white',
            width: 40,
            height: 40,
            '&:hover': { bgcolor: '#97c2d5' },
            transition: 'all 0.3s'
        }}
    >
        <ChevronRight size={20} />
    </IconButton>
);

const PrevArrow = ({ onClick }) => (
    <IconButton
        onClick={onClick}
        sx={{
            position: 'absolute',
            left: { xs: 0, md: -30 },
            top: '40%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            bgcolor: '#1e293b',
            color: 'white',
            width: 40,
            height: 40,
            '&:hover': { bgcolor: '#97c2d5' },
            transition: 'all 0.3s'
        }}
    >
        <ChevronLeft size={20} />
    </IconButton>
);

const BestSellerSection = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1280,
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 640,
                settings: { slidesToShow: 1 }
            }
        ]
    };

    return (
        <Box sx={{ py: 10, bgcolor: '#ffffff' }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography
                    sx={{
                        fontSize: { xs: '1.5rem', md: '2.5rem' },
                        fontWeight: 300,
                        fontFamily: "'Playfair Display', serif",
                        letterSpacing: 2,
                        color: '#1e293b',
                        mb: 2,
                        textTransform: 'uppercase'
                    }}
                >
                    Best Sellers
                </Typography>
                <div className="w-16 h-[2px] bg-[#97c2d5] mx-auto opacity-50" />
            </Box>

            <div className="max-w-[1400px] mx-auto px-10 relative">
                <Slider {...settings}>
                    {products.map((product) => (
                        <BestSellerCard key={product.id} product={product} />
                    ))}
                </Slider>
            </div>

            <Box sx={{ textAlign: 'center', mt: 8 }}>
                <Button
                    variant="contained"
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        window.location.href = '/product-catalogue'; // Example working link
                    }}
                    sx={{
                        bgcolor: '#1e293b', // Primary Slate
                        color: 'white',
                        px: 8,
                        py: 2,
                        borderRadius: '4px', // Subtle rounding for premium feel
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        letterSpacing: 3,
                        boxShadow: '0 4px 14px 0 rgba(30, 41, 59, 0.2)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        textTransform: 'uppercase',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                            bgcolor: '#97c2d5', // Loupe Blue Hover
                            boxShadow: '0 8px 25px rgba(151, 194, 213, 0.4)',
                            transform: 'translateY(-2px)'
                        },
                        '&:active': {
                            transform: 'translateY(0)'
                        }
                    }}
                >
                    Explore All Best Sellers
                </Button>
            </Box>
        </Box>
    );
};

export default BestSellerSection;

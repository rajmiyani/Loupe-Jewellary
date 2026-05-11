import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const products = [
    {
        id: "1",
        title: "Diamond Bracelet",
        price: "82,000",
        oldPrice: "88,000",
        discount: "7% Off",
        video: "./jewellery.mp4" // Placeholder realistic looking jewelry video or any generic
    },
    {
        id: "2",
        title: "Butterfly Bloom Lab Grown Diamond...",
        price: "13,130",
        oldPrice: "13,679",
        discount: "4% Off",
        video: "./jewellary.mp4"
    },
    {
        id: "3",
        title: "Princess Duo Drop Studs",
        price: "43,699",
        oldPrice: "46,168",
        discount: "5% Off",
        video: "./jewellery.mp4"
    },
    {
        id: "4",
        title: "Antique Round Diamond Clus...",
        price: "21,749",
        oldPrice: "29,090",
        discount: "25% Off",
        video: "./jewellary.mp4"
    },
    {
        id: "5",
        title: "Gleaming Floral Diamond Ring",
        price: "40,782",
        oldPrice: "45,000",
        discount: "9% Off",
        video: "./jewellery.mp4"
    }
];

const NextArrow = ({ onClick }) => (
    <IconButton
        onClick={onClick}
        sx={{
            position: 'absolute',
            right: { xs: 0, md: -20 },
            top: '45%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            bgcolor: 'white',
            color: '#1e293b',
            width: 40,
            height: 40,
            boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
            '&:hover': { bgcolor: '#f8fafc' },
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
            left: { xs: 0, md: -20 },
            top: '45%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            bgcolor: 'white',
            color: '#1e293b',
            width: 40,
            height: 40,
            boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
            '&:hover': { bgcolor: '#f8fafc' },
            transition: 'all 0.3s'
        }}
    >
        <ChevronLeft size={20} />
    </IconButton>
);

const PerfectSparkleSection = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
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
        <Box sx={{ py: 6, bgcolor: '#ffffff' }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography
                    sx={{
                        fontSize: { xs: '1.2rem', md: '1.8rem' },
                        fontWeight: 300,
                        fontFamily: "'Playfair Display', serif",
                        letterSpacing: 2,
                        color: '#1e293b',
                        mb: 2,
                        textTransform: 'uppercase'
                    }}
                >
                    FIND YOUR PERFECT SPARKLE
                </Typography>
            </Box>

            <div className="max-w-[1400px] mx-auto px-10 relative">
                <Slider {...settings}>
                    {products.map((product) => (
                        <div key={product.id} className="px-3 cursor-pointer group">
                            <div className="flex flex-col">
                                {/* Video Container */}
                                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#e0f2fe] mb-4">
                                    <video
                                        src={product.video}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex flex-col text-left">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[#1e293b] font-bold text-sm md:text-base">
                                            ₹{product.price}
                                        </span>
                                        <span className="text-gray-400 line-through text-xs md:text-sm">
                                            ₹{product.oldPrice}
                                        </span>
                                        <span className="text-[#97c2d5] font-medium text-xs md:text-sm">
                                            {product.discount}
                                        </span>
                                    </div>
                                    <span className="text-gray-500 text-xs md:text-sm truncate">
                                        {product.title}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </Box>
    );
};

export default PerfectSparkleSection;

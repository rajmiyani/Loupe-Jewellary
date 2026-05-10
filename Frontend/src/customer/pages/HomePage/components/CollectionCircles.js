import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const categories = [
    { name: "RINGS", image: "https://images.unsplash.com/photo-1605100804763-247f67b3f41e?q=80&w=1000&auto=format&fit=crop", id: "rings" },
    { name: "EARRINGS", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop", id: "earrings" },
    { name: "NECKLACES & PENDANTS", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop", id: "necklaces" },
    { name: "BRACELETS", image: "https://images.unsplash.com/photo-1611085510590-09c063b46903?q=80&w=1000&auto=format&fit=crop", id: "bracelets" },
    { name: "MANGALSUTRA", image: "https://rukminim2.flixcart.com/image/612/612/k6xxmkw0/necklace-pendant-set/4/r/y/p00010-01-aachho-original-imafzaeghzy6gehr.jpeg?q=70", id: "mangalsutra" },
    { name: "CHARMS", image: "https://images.unsplash.com/photo-1603561591411-0e7320b9795d?q=80&w=1000&auto=format&fit=crop", id: "charms" },
    { name: "SOLITAIRES", image: "https://images.unsplash.com/photo-1584305116359-2435fd47b0bf?q=80&w=1000&auto=format&fit=crop", id: "solitaires" },
    { name: "GOLD COINS", image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=1000&auto=format&fit=crop", id: "gold-coins" },
    { name: "KIDS JEWELLERY", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1000&auto=format&fit=crop", id: "kids-jewellery" }
];

const CollectionCircles = () => {
    const navigate = useNavigate();

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 800,
        autoplaySpeed: 2500,
        cssEase: "ease-in-out",
        arrows: false,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };

    return (
        <Box sx={{ py: 10, bgcolor: '#ffffff', overflow: 'hidden' }}>
            <div className="max-w-[1600px] mx-auto">
                <Slider {...settings}>
                    {categories.map((cat, i) => (
                        <Box
                            key={i}
                            sx={{
                                px: 2,
                                display: 'flex !important',
                                flexDirection: 'column',
                                alignItems: 'center',
                                cursor: 'pointer',
                                '&:hover img': { transform: 'scale(1.05)' }
                            }}
                            onClick={() => navigate(`/all-jewellery/category/${cat.id}`)}
                        >
                            <Box
                                sx={{
                                    width: { xs: 150, md: 190 },
                                    height: { xs: 150, md: 190 },
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    mb: 2,
                                    border: '1px solid #f1f5f9',
                                    bgcolor: '#f8fafc',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    p: 1
                                }}
                            >
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover rounded-full transition-transform duration-500"
                                />
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: '0.7rem',
                                    fontWeight: 900,
                                    letterSpacing: 2,
                                    color: '#1e293b',
                                    textAlign: 'center',
                                    textTransform: 'uppercase'
                                }}
                            >
                                {cat.name}
                            </Typography>
                        </Box>
                    ))}
                </Slider>
            </div>
        </Box>
    );
};

export default CollectionCircles;

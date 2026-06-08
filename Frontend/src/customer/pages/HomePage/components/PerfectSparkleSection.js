import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Box, Typography, IconButton, Skeleton } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { API_BASE_URL } from '../../../../config/apiConfig';

const NextArrow = ({ onClick }) => (
    <IconButton
        onClick={onClick}
        sx={{
            position: 'absolute', right: { xs: 0, md: -20 }, top: '45%',
            transform: 'translateY(-50%)', zIndex: 10, bgcolor: 'white', color: '#755970',
            width: 40, height: 40, boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
            '&:hover': { bgcolor: '#f8fafc' }, transition: 'all 0.3s'
        }}
    >
        <ChevronRight size={20} />
    </IconButton>
);

const PrevArrow = ({ onClick }) => (
    <IconButton
        onClick={onClick}
        sx={{
            position: 'absolute', left: { xs: 0, md: -20 }, top: '45%',
            transform: 'translateY(-50%)', zIndex: 10, bgcolor: 'white', color: '#755970',
            width: 40, height: 40, boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
            '&:hover': { bgcolor: '#f8fafc' }, transition: 'all 0.3s'
        }}
    >
        <ChevronLeft size={20} />
    </IconButton>
);

const PerfectSparkleSection = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/sparkle-videos`)
            .then(res => res.json())
            .then(data => setVideos(Array.isArray(data) ? data : []))
            .catch(() => setVideos([]))
            .finally(() => setLoading(false));
    }, []);

    const settings = {
        dots: false,
        infinite: videos.length >= 4,  // only loop when enough slides to fill the row
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        rows: 1,           // prevent react-slick from ever wrapping into multiple rows
        slidesPerRow: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 3, rows: 1, slidesPerRow: 1, infinite: videos.length >= 3 } },
            { breakpoint: 1024, settings: { slidesToShow: 2, rows: 1, slidesPerRow: 1, infinite: videos.length >= 2 } },
            { breakpoint: 640,  settings: { slidesToShow: 1, rows: 1, slidesPerRow: 1, infinite: videos.length >= 1 } }
        ]
    };

    return (
        <Box sx={{ py: 6, bgcolor: '#ffffff' }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography
                    sx={{
                        fontSize: { xs: '1.2rem', md: '1.8rem' }, fontWeight: 300,
                        fontFamily: "'Playfair Display', serif", letterSpacing: 2,
                        color: '#755970', mb: 2, textTransform: 'uppercase'
                    }}
                >
                    FIND YOUR PERFECT SPARKLE
                </Typography>
            </Box>

            <div className="max-w-[1400px] mx-auto px-10 relative">
                {loading ? (
                    /* Loading skeleton */
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        {[1, 2, 3, 4].map(i => (
                            <Box key={i} sx={{ flex: 1 }}>
                                <Skeleton variant="rectangular" sx={{ borderRadius: '12px', aspectRatio: '3/4', mb: 1.5 }} />
                                <Skeleton width="60%" height={18} sx={{ mb: 0.5 }} />
                                <Skeleton width="80%" height={14} />
                            </Box>
                        ))}
                    </Box>
                ) : videos.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                        <Typography sx={{ color: '#94a3b8', fontWeight: 600 }}>
                            No sparkle videos yet. Add some from the Admin panel.
                        </Typography>
                    </Box>
                ) : (
                    <Slider {...settings}>
                        {videos.map((video) => (
                            <div key={video._id} className="px-3 cursor-pointer group">
                                <div className="flex flex-col">
                                    {/* Cloudinary Video — delivered at best quality via q_auto:best,vc_auto in URL */}
                                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#e0f2fe] mb-4">
                                        <video
                                            src={video.videoUrl}
                                            autoPlay loop muted playsInline
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[#755970] font-bold text-sm md:text-base">₹{video.price}</span>
                                            {video.oldPrice && (
                                                <span className="text-gray-400 line-through text-xs md:text-sm">₹{video.oldPrice}</span>
                                            )}
                                            {video.discount && (
                                                <span className="text-[#755970] font-medium text-xs md:text-sm">{video.discount}</span>
                                            )}
                                        </div>
                                        <span className="text-gray-500 text-xs md:text-sm truncate">{video.title}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                )}
            </div>
        </Box>
    );
};

export default PerfectSparkleSection;


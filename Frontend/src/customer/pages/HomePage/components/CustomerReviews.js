import React from 'react';
import { Box, Typography } from '@mui/material';

// 8 Curated Luxury Testimonials tailored for Loupe Jewellery
const row1Reviews = [
  {
    id: 'rev-1',
    name: 'Ananya Sharma',
    location: 'Kolkata',
    avatar: 'A',
    avatarBg: '#344437', // Deep Forest Olive
    quote: 'The diamond solitaire pendant is breathtaking. The certified brilliance, delicate prongs, and luxury unboxing made it pure magic.',
  },
  {
    id: 'rev-2',
    name: 'Radhika Singhania',
    location: 'Mumbai',
    avatar: 'R',
    avatarBg: '#8a5a44', // Warm Terracotta Rust
    quote: 'My everyday eternity ring gathers compliments wherever I step. It truly feels like carrying a timeless piece of artwork.',
  },
  {
    id: 'rev-3',
    name: 'Dr. Pooja Deshmukh',
    location: 'Pune',
    avatar: 'P',
    avatarBg: '#9a604c', // Rich Clay Rust
    quote: 'Impeccable BIS hallmarked finish and whisper-smooth comfort band. Loupe’s bespoke team delivered perfection for our anniversary.',
  },
  {
    id: 'rev-4',
    name: 'Meera Kapoor',
    location: 'Bengaluru',
    avatar: 'M',
    avatarBg: '#1e3545', // Royal Navy
    quote: 'The diamond cluster studs sparkle with extraordinary fire. The secure setting and certified authenticity gave complete peace of mind.',
  },
];

const row2Reviews = [
  {
    id: 'rev-5',
    name: 'Tara Varma',
    location: 'Hyderabad',
    avatar: 'T',
    avatarBg: '#344437', // Deep Forest Olive
    quote: 'Unbelievable craftsmanship and presentation. Came with authentic certification cards and a handwritten note from the studio guild.',
  },
  {
    id: 'rev-6',
    name: 'Gayatri Subramanian',
    location: 'Chennai',
    avatar: 'G',
    avatarBg: '#423d38', // Dark Warm Charcoal
    quote: 'The handcrafted necklace and diamond drop earrings are sheer poetry. Sits like a second skin with sublime, weightless balance.',
  },
  {
    id: 'rev-7',
    name: 'Vikramaditya Rathore',
    location: 'Jaipur',
    avatar: 'V',
    avatarBg: '#405141', // Earthy Pine
    quote: 'The slow artisanal provenance is unmistakable in every bezel setting. Flawless tennis bracelet finish and prompt, insured delivery.',
  },
  {
    id: 'rev-8',
    name: 'Simran Kaur',
    location: 'Chandigarh',
    avatar: 'S',
    avatarBg: '#7a523a', // Amber Teak
    quote: 'From custom consultation to receiving my bridal set, every detail was royal. The finish and diamond fire are world-class.',
  },
];

// Single Testimonial Card matching the reference design
const TestimonialCard = ({ item }) => (
  <div className="w-[320px] sm:w-[380px] md:w-[420px] flex-shrink-0 bg-white rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 md:p-6 border border-[#ece7de] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#ded6c9] transition-all duration-300 mx-2 sm:mx-3 text-left">
    <div className="flex items-start gap-3.5 sm:gap-4">
      {/* Circle Avatar with Capital Initial */}
      <div
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white text-base sm:text-lg font-serif font-semibold shrink-0 shadow-sm"
        style={{ backgroundColor: item.avatarBg }}
      >
        {item.avatar}
      </div>

      {/* Content Column */}
      <div className="flex-1 min-w-0">
        {/* Top Meta Row: Stars & Verified Badge */}
        <div className="flex items-center justify-between gap-2 mb-1">
          {/* 5 Amber/Gold Stars */}
          <div className="flex items-center gap-0.5 text-[#d97706]">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Verified Badge with Outline Checkmark */}
          <div className="flex items-center gap-1 text-[11px] sm:text-xs font-medium text-[#9d785d]">
            <svg
              className="w-3.5 h-3.5 text-[#9d785d]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9.5" />
              <path d="M8.5 12.5l2.5 2.5 5-5" />
            </svg>
            <span>Verified</span>
          </div>
        </div>

        {/* Customer Name & Location */}
        <div className="flex items-center flex-wrap gap-1 mb-1.5">
          <span className="text-[13.5px] sm:text-[14.5px] font-bold text-[#1e293b]">
            {item.name}
          </span>
          <span className="text-[11.5px] sm:text-xs text-[#64748b] font-normal">
            • {item.location}
          </span>
        </div>

        {/* Quote Text */}
        <p className="text-[12px] sm:text-[13px] text-[#475569] leading-relaxed font-normal">
          “{item.quote}”
        </p>
      </div>
    </div>
  </div>
);

const CustomerReviews = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, sm: 10, md: 14 },
        background: 'linear-gradient(160deg, #f0f7fc 0%, #fdfcf7 40%, #f0f7fc 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Decorative Ambient Orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(169,206,229,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -60,
          left: -60,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Section Header */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-8 sm:mb-12 relative z-10">
        {/* Eyebrow Pill */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.5,
            background: 'linear-gradient(135deg, rgba(60,115,153,0.08), rgba(212,175,55,0.08))',
            border: '1px solid rgba(60,115,153,0.15)',
            borderRadius: '40px',
            px: 2.5,
            py: 0.6,
            mb: 2.5,
          }}
        >
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#3c7399]">
            Customer Stories
          </span>
        </Box>

        {/* Main Heading */}
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.9rem', sm: '2.5rem', md: '3.2rem' },
            fontWeight: 400,
            fontFamily: 'Georgia, serif',
            color: '#1e3545',
            letterSpacing: 1,
            mb: 1.5,
            lineHeight: 1.2,
          }}
        >
          Loved Across{' '}
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(135deg, #3c7399, #a9cee5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            India
          </Box>
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1.02rem' },
            color: '#64748b',
            maxWidth: 620,
            mx: 'auto',
            lineHeight: 1.7,
            px: 2,
          }}
        >
          Real experiences from our cherished customers who found their perfect piece with us.
        </Typography>
      </div>

      {/* Marquee Carousel Container with Gradient Fade Overlays */}
      <div className="relative w-full overflow-hidden group">
        {/* Left Edge Gradient Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 md:w-40 bg-gradient-to-r from-[#f0f7fc] via-[#f0f7fc]/80 to-transparent z-10" />

        {/* Right Edge Gradient Fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 md:w-40 bg-gradient-to-l from-[#f0f7fc] via-[#f0f7fc]/80 to-transparent z-10" />

        {/* Row 1: Smooth Infinite Flow Left */}
        <div className="flex w-fit marquee-row-1 mb-4 sm:mb-5 hover:[animation-play-state:paused]">
          {/* First set */}
          {row1Reviews.map((item) => (
            <TestimonialCard key={`r1-a-${item.id}`} item={item} />
          ))}
          {/* Seamless loop duplicate */}
          {row1Reviews.map((item) => (
            <TestimonialCard key={`r1-b-${item.id}`} item={item} />
          ))}
          {/* Extra duplicate for ultra-wide screens */}
          {row1Reviews.map((item) => (
            <TestimonialCard key={`r1-c-${item.id}`} item={item} />
          ))}
        </div>

        {/* Row 2: Staggered Smooth Infinite Flow Right */}
        <div className="flex w-fit marquee-row-2 hover:[animation-play-state:paused]">
          {/* First set */}
          {row2Reviews.map((item) => (
            <TestimonialCard key={`r2-a-${item.id}`} item={item} />
          ))}
          {/* Seamless loop duplicate */}
          {row2Reviews.map((item) => (
            <TestimonialCard key={`r2-b-${item.id}`} item={item} />
          ))}
          {/* Extra duplicate for ultra-wide screens */}
          {row2Reviews.map((item) => (
            <TestimonialCard key={`r2-c-${item.id}`} item={item} />
          ))}
        </div>
      </div>

      {/* Marquee Smooth Keyframe CSS */}
      <style>{`
        .marquee-row-1 {
          animation: marqueeScrollLeft 38s linear infinite;
          will-change: transform;
        }
        .marquee-row-2 {
          animation: marqueeScrollRight 42s linear infinite;
          will-change: transform;
        }

        @keyframes marqueeScrollLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }

        @keyframes marqueeScrollRight {
          0% {
            transform: translate3d(-33.333%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        @media (max-width: 640px) {
          .marquee-row-1 {
            animation-duration: 28s;
          }
          .marquee-row-2 {
            animation-duration: 32s;
          }
        }
      `}</style>
    </Box>
  );
};

export default CustomerReviews;

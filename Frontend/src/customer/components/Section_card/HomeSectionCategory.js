import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const HomeSectionCategory = () => {
  const categories = [
    {
      name: "Earrings",
      nav: "/all-jewellery/category/earring",
      img: "https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439069/1_hvyglx.jpg"
    },
    {
      name: "Finger Rings",
      nav: "/all-jewellery/category/ring",
      img: "https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439067/3_xwvjdr.jpg"
    },
    {
      name: "Pendants",
      nav: "/all-jewellery/category/pendant",
      img: "https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439065/2_ao746r.jpg"
    },
    {
      name: "Mangalsutras",
      nav: "/all-jewellery/category/mangal-sutra",
      img: "https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731944/fod-mangalsutra_zb7tpy.webp"
    },
    {
      name: "Chains",
      nav: "/all-jewellery/category/chain",
      img: "https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731944/fod-necklace_wrjwfl.webp"
    },
    {
      name: "Bracelets",
      nav: "/all-jewellery/category/bracelet",
      img: "https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731943/fod-bracelet_um6zoo.webp"
    },
    {
      name: "Bangles",
      nav: "/all-jewellery/category/bangle",
      img: "https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731879/fod-bangle_bsxfzl.webp"
    },
    {
      name: "Neckwears",
      nav: "/all-jewellery/category/necklace",
      img: "https://res.cloudinary.com/deq0hxr3t/image/upload/v1707742460/45_eqespc.jpg"
    },
  ]

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  }

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <section className='py-20 overflow-hidden' id='categories'>
      <div className='max-w-[1400px] mx-auto px-6'>
        {/* Header section with refined, smaller font size */}
        <div className='flex flex-col items-center mb-16 text-center'>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className='text-[#3c7399] font-bold tracking-[0.25em] uppercase text-[10px] mb-3'
          >
            Collections
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-light text-gray-800 tracking-wide uppercase"
          >
            Shop By <span className='font-bold text-[#3c7399]'>Category</span>
          </motion.h2>
        </div>

        {/* Luxury Portrait Auto-Slider */}
        <div className='category-slider-container'>
          <Slider {...sliderSettings}>
            {categories.map((item) => (
              <div key={item.name} className='px-4'>
                <Link
                  to={item.nav}
                  className='group flex flex-col items-center'
                >
                  {/* The Portrait Container with Halo Effect */}
                  <div className='relative mb-6'>
                    {/* Halo Background Ring - Pure brand color */}
                    <div className='absolute inset-[-8px] rounded-full border border-[#3c7399]/10 scale-95 group-hover:scale-100 group-hover:border-[#3c7399]/30 group-hover:bg-[#3c7399]/5 transition-all duration-700 ease-[0.23, 1, 0.32, 1]' />

                    {/* Circular Image Wrap */}
                    <div className='relative w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-sm transition-all duration-700 group-hover:shadow-[0_15px_40px_rgba(151,194,213,0.25)]'>
                      <img
                        src={item.img}
                        alt={item.name}
                        className='w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-[1.2s] group-hover:scale-110'
                      />
                    </div>

                    {/* Minimalist View Label */}
                    <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                      <div className='bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm'>
                        <span className='text-[8px] font-bold tracking-tighter text-[#1e3545] uppercase'>Discover</span>
                      </div>
                    </div>
                  </div>

                  {/* Minimalist Typography */}
                  <div className='text-center'>
                    <h3 className='text-[11px] md:text-xs font-bold text-gray-700 tracking-[0.2em] uppercase group-hover:text-[#3c7399] transition-colors duration-500'>
                      {item.name}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default HomeSectionCategory

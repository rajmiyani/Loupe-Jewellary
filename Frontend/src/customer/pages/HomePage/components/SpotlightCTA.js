import React from 'react';

const SpotlightCTA = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 border dark:border-gray-700">
      <div className="absolute inset-0 opacity-20" aria-hidden>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
              <stop stopColor="#ec4899" offset="0%" />
              <stop stopColor="#f59e0b" offset="100%" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </div>
      <div className="relative px-6 py-12 md:px-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
        <div className="slide-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#97c2d5] dark:text-white">
            Elevate Your Shine
          </h2>
          <p className="mt-3 text-gray-700 dark:text-gray-300 max-w-prose">
            Explore handcrafted collections designed for every celebration. New designs drop every week.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/all-jewellery/category/necklace" className="inline-flex items-center rounded-lg bg-[#6a9eb5] px-4 py-2 text-white font-semibold hover:bg-[#97c2d5] transition">
              Shop Necklaces
            </a>
            <a href="/gold/earrings/stud?type=gold" className="inline-flex items-center rounded-lg border border-[#6a9eb5] text-[#6a9eb5] px-4 py-2 font-semibold hover:bg-blue-50 dark:text-[#97c2d5] dark:border-[#97c2d5] dark:hover:bg-gray-800 transition">
              Explore Earrings
            </a>
          </div>
        </div>
        <div className="zoom-in">
          <img
            src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1711733523/latest-earrings_osmidc.webp"
            alt="hero jewellery"
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default SpotlightCTA;










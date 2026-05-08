import React from 'react';

const stories = [
  {
    title: 'Ethical Sourcing',
    desc: 'Every stone is conflict‑free and carefully selected.',
    icon: '💎',
  },
  {
    title: 'Lifetime Care',
    desc: 'Free cleaning and polishing at our partner stores.',
    icon: '🧼',
  },
  {
    title: 'Artisan Made',
    desc: 'Handcrafted by artisans with decades of expertise.',
    icon: '🛠️',
  },
  {
    title: 'Insured Delivery',
    desc: 'Fast, tracked, and insured shipping worldwide.',
    icon: '🚚',
  },
];

const StoryCard = ({ item, index }) => {
  return (
    <div className="group relative rounded-2xl border bg-white dark:bg-gray-900 dark:border-gray-700 p-6 overflow-hidden">
      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-blue-100 dark:bg-gray-800 group-hover:scale-125 transition-transform" />
      <div className="relative">
        <div className="text-3xl">
          <span role="img" aria-hidden>
            {item.icon}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-bold text-[#97c2d5] dark:text-white">{item.title}</h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
      </div>
    </div>
  );
};

const StoryStrip = () => {
  return (
    <section className="px-2 md:px-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#97c2d5] dark:text-white">Our Promise</h2>
        <a href="/user-details/?layout=3" className="text-[#6a9eb5] hover:underline dark:text-[#97c2d5]">Contact us</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stories.map((s, idx) => (
          <div key={s.title} className="reveal">
            <StoryCard item={s} index={idx} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoryStrip;










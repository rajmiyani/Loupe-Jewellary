import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const collections = [
    {
        title: "The Bridal Suite",
        subtitle: "Eternal Elegance",
        image: "https://images.unsplash.com/photo-1544441893-675973e31d85?q=80&w=1000&auto=format&fit=crop",
        link: "/all-jewellery/category/necklace?collection=bridal",
        size: "large"
    },
    {
        title: "Everyday Chic",
        subtitle: "Modern Staples",
        image: "https://images.unsplash.com/photo-1573408302185-91275f923b17?q=80&w=1000&auto=format&fit=crop",
        link: "/all-jewellery/category/rings?collection=everyday",
        size: "small"
    },
    {
        title: "Office Sophistication",
        subtitle: "Refined Luxury",
        image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1000&auto=format&fit=crop",
        link: "/all-jewellery/category/earrings?collection=office",
        size: "small"
    }
];

const FeaturedCollections = () => {
    const navigate = useNavigate();

    return (
        <section className="py-20 bg-white">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <span className="text-[#755970] font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Curated Series</span>
                        <h2 className="text-3xl md:text-5xl font-light text-gray-900 leading-tight">
                            Collections that <span className="font-bold italic">Define You</span>
                        </h2>
                    </div>
                    <button
                        onClick={() => navigate('/all-jewellery')}
                        className="text-sm font-bold uppercase tracking-widest border-b-2 border-[#755970] pb-1 hover:text-[#2c1e2f] transition-colors"
                    >
                        Show All
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[600px] md:h-[800px]">
                    {/* Large Card */}
                    <motion.div
                        whileHover={{ scale: 0.98 }}
                        className="relative h-full overflow-hidden rounded-3xl cursor-pointer group"
                        onClick={() => navigate(collections[0].link)}
                    >
                        <img
                            src={collections[0].image}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            alt={collections[0].title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-10 left-10 text-white">
                            <span className="text-xs uppercase tracking-[0.3em] opacity-80 mb-2 block">{collections[0].subtitle}</span>
                            <h3 className="text-3xl font-bold">{collections[0].title}</h3>
                        </div>
                    </motion.div>

                    {/* Right Column with two small cards */}
                    <div className="grid grid-rows-2 gap-8 h-full">
                        {collections.slice(1).map((col, idx) => (
                            <motion.div
                                key={col.title}
                                whileHover={{ scale: 0.98 }}
                                className="relative h-full overflow-hidden rounded-3xl cursor-pointer group"
                                onClick={() => navigate(col.link)}
                            >
                                <img
                                    src={col.image}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    alt={col.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                <div className="absolute bottom-8 left-8 text-white">
                                    <span className="text-xs uppercase tracking-[0.3em] opacity-80 mb-2 block">{col.subtitle}</span>
                                    <h3 className="text-2xl font-bold">{col.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollections;

import React from 'react';
import { motion } from 'framer-motion';

const lookbookItems = [
    // "https://images.unsplash.com/photo-1515562141207-7a88fb0ce33e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1974&auto=format&fit=crop",
    // "https://images.unsplash.com/photo-1573408302185-91275f923b17?q=80&w=1983&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1974&auto=format&fit=crop"
];

const SocialLookbook = () => {
    return (
        <section className="py-24 bg-white px-6 overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#755970] font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Discover More</span>
                    <h2 className="text-3xl md:text-5xl font-light text-gray-900 leading-tight">
                        The Loupe <span className="font-bold italic">Lookbook</span>
                    </h2>
                </div>

                <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
                    {lookbookItems.map((img, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative overflow-hidden rounded-3xl group cursor-pointer"
                        >
                            <img
                                src={img}
                                alt={`lookbook-${idx}`}
                                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[#755970]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 right-0 p-6">
                                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                                    <span className="text-[#755970] text-xs font-bold">â™¥</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-gray-400 text-sm mb-6 tracking-widest uppercase">Tag us to be featured @LoupeJewels</p>
                    <button className="px-12 py-4 bg-gray-900 text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#755970] transition-colors rounded-full shadow-lg">
                        Shop the Feed
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SocialLookbook;

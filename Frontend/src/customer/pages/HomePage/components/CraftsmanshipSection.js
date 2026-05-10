import React from 'react';
import { motion } from 'framer-motion';

const CraftsmanshipSection = () => {
    return (
        <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-neutral-900 group">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] group-hover:scale-110"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1576188973526-0e5d7047b0ea?q=80&w=1000&auto=format&fit=crop")',
                    opacity: 0.6
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

            {/* Content Container */}
            <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center items-start">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="max-w-2xl"
                >
                    <span className="text-[#97c2d5] font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
                        The Art of Creation
                    </span>
                    <h2 className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">
                        Crafted with <br />
                        <span className="font-bold italic">Unrivaled Precision</span>
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl font-light mb-10 leading-relaxed">
                        Every Loupe masterpiece is a testament to centuries-old techniques combined with modern innovation. Our artisans spend hundreds of hours perfecting the smallest detail, ensuring that your jewelry is as unique as your story.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-4 border border-white/30 text-white font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Discover the Process
                    </motion.button>
                </motion.div>
            </div>

            {/* Dynamic Elements */}
            <div className="absolute bottom-10 right-10 flex items-center gap-4">
                <div className="h-[1px] w-20 bg-white/20" />
                <span className="text-white/40 text-[10px] tracking-[0.4em] uppercase">Est. 1998</span>
            </div>
        </div>
    );
};

export default CraftsmanshipSection;

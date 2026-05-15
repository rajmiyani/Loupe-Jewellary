import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const metals = [
    { name: "Yellow Gold", color: "#FFD700", slug: "gold", gradient: "from-[#FFD700] to-[#B8860B]" },
    { name: "Sterling Silver", color: "#C0C0C0", slug: "silver", gradient: "from-[#C0C0C0] to-[#808080]" },
    { name: "Rose Gold", color: "#B76E79", slug: "rose-gold", gradient: "from-[#B76E79] to-[#8E414B]" },
    { name: "Platinum", color: "#E5E4E2", slug: "platinum", gradient: "from-[#E5E4E2] to-[#BCC6CC]" }
];

const MetalSelector = () => {
    const navigate = useNavigate();

    return (
        <section className="py-20 bg-neutral-50 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <span className="text-[#755970] font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Pure Quality</span>
                <h2 className="text-3xl font-light mb-16 text-gray-900">Shop by <span className="font-bold italic">Metal</span></h2>

                <div className="flex flex-wrap justify-center gap-10 md:gap-20">
                    {metals.map((metal, index) => (
                        <motion.div
                            key={metal.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            onClick={() => navigate(`/all-jewellery?metal=${metal.slug}`)}
                            className="flex flex-col items-center cursor-pointer group"
                        >
                            <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${metal.gradient} shadow-lg p-1 mb-6 relative overflow-hidden ring-4 ring-white`}>
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-700 group-hover:text-[#755970] transition-colors">{metal.name}</h3>
                            <div className="w-0 h-[2px] bg-[#755970] group-hover:w-full transition-all duration-300 mt-2" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MetalSelector;

import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, ShieldCheck, Gift, Headphones } from 'lucide-react';

const services = [
    {
        title: "Custom Design",
        desc: "Collaborate with our master designers to bring your unique vision to life.",
        Icon: PenTool
    },
    {
        title: "Lifetime Warranty",
        desc: "We stand by our craftsmanship. Every piece is guaranteed for a lifetime.",
        Icon: ShieldCheck
    },
    {
        title: "Eco-Friendly Wrapping",
        desc: "Luxury packaging that respects our planet. Elegant and sustainable.",
        Icon: Gift
    },
    {
        title: "Expert Consultation",
        desc: "Speak with our certified gemologists for personalized guidance.",
        Icon: Headphones
    }
];

const BespokeServices = () => {
    return (
        <section className="py-24 bg-neutral-50 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-[#3c7399] group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2 border border-neutral-100">
                                <service.Icon size={24} className="text-[#1e3545] group-hover:text-black transition-colors duration-500" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">
                                {service.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BespokeServices;

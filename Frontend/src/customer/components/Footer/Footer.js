import { Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='w-full bg-[#402d43] text-white pt-10 pb-5 border-t border-white/10'>
            <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
                <Grid container spacing={10}>
                    {/* Column 1: Boutique Collections */}
                    <Grid item xs={12} sm={6} md={3}>
                        <div className='mb-14'>
                            <h3 className='text-xs font-bold uppercase tracking-[0.3em] text-white mb-10'>
                                Collections
                            </h3>
                            <ul className="space-y-6 text-[13px] font-medium text-white/90 tracking-wider">
                                {['Rings', 'Earrings', 'Necklace', 'Bracelets'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            to={`/all-jewellery/category/${item.toLowerCase().replace('bracelets', 'bracelate')}`}
                                            className='hover:text-[#0a0a0a] transition-all duration-300 transform inline-block hover:translate-x-1'
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link to="/customize" className='italic font-semibold transition-colors'>
                                        Customize Your Piece
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Grid>

                    {/* Column 2: Legal & Care */}
                    <Grid item xs={12} sm={6} md={3}>
                        <div className='mb-14'>
                            <h3 className='text-xs font-bold uppercase tracking-[0.3em] text-white mb-10'>
                                Customer Care
                            </h3>
                            <ul className="space-y-6 text-[13px] font-medium text-white/90 tracking-wider">
                                {[
                                    { name: 'Privacy Policy', path: '/privacy' },
                                    { name: 'Refund Policy', path: '/refund' },
                                    { name: 'Shipping Policy', path: '/shipping' },
                                    { name: 'Terms of Service', path: '/terms' },
                                    { name: 'Contact Information', path: '/contact-info' }
                                ].map((policy) => (
                                    <li key={policy.name}>
                                        <Link
                                            to={policy.path}
                                            className='hover:text-[#0a0a0a] transition-all duration-300 transform inline-block hover:translate-x-1'
                                        >
                                            {policy.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Grid>

                    {/* Column 3: The Circle (Newsletter) */}
                    <Grid item xs={12} sm={6} md={3}>
                        <div className='mb-14 pr-4'>
                            <h3 className='text-xs font-bold uppercase tracking-[0.3em] text-white mb-10'>
                                The Circle
                            </h3>
                            <p className='text-[13px] text-white/80 leading-relaxed mb-10'>
                                Join our exclusive list for early access to new collections and boutique events.
                            </p>
                            <div className='relative'>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className='w-full bg-transparent border-b border-white/40 pb-4 text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors placeholder:text-white/40 text-white'
                                />
                                <button className='absolute right-0 bottom-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-[#0a0a0a] transition-colors'>
                                    Join
                                </button>
                            </div>
                        </div>
                    </Grid>

                    {/* Column 4: Contact Clusters */}
                    <Grid item xs={12} sm={6} md={3}>
                        <div className='mb-14 text-left'>
                            <h3 className='text-xs font-bold uppercase tracking-[0.3em] text-white mb-10'>
                                Contact
                            </h3>
                            <div className='space-y-6 text-[13px] text-white/90 leading-loose tracking-wide'>
                                <p className='max-w-[250px]'>
                                    <strong className="text-white/70 block mb-1">Address:</strong>
                                    12-17 Sardar Owners, Association, Mini Bazar, Varachha, Surat, Gujarat, India - 395006
                                </p>
                                <p>
                                    <strong className="text-white/70 block mb-1">Email:</strong>
                                    <a href="mailto:loupejewelsllp@gmail.com" className='hover:text-[#0a0a0a] transition-colors'>
                                        loupejewelsllp@gmail.com
                                    </a>
                                </p>
                                <p>
                                    <strong className="text-white/70 block mb-1">Mobile No:</strong>
                                    <a href="tel:+919909109074" className='hover:text-[#0a0a0a] transition-colors'>
                                        +91 99091 09074, +91 99091 87074 <br /> +91 99091 09974
                                    </a>
                                </p>
                                <div className='flex gap-6 items-center pt-4'>
                                    {[
                                        { icon: 'fa-facebook', url: 'https://www.facebook.com/loupe_jewellery/' }, // Placeholder/Guess
                                        { icon: 'fa-instagram', url: 'https://www.instagram.com/loupe_jewellery/' },
                                        { icon: 'fa-whatsapp', url: 'https://wa.me/919909109074' }
                                    ].map((social) => (
                                        <Link
                                            key={social.icon}
                                            to={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className='text-lg hover:text-[#0a0a0a] transition-all hover:-translate-y-1'
                                        >
                                            <i className={`fa-brands ${social.icon}`}></i>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>

                {/* Bottom Row Credits */}
                <div className='pt-5 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-6'>
                    <p className='text-[10px] uppercase tracking-[0.4em] text-white'>
                        &copy; 2025 Loupe Jewellery LLP . All rights reserved.
                    </p>
                    <p className='text-[10px] uppercase tracking-[0.4em] text-white'>
                        Dev by <a href="#" className='hover:text-[#0a0a0a] transition-colors'>Codiq Solution</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer

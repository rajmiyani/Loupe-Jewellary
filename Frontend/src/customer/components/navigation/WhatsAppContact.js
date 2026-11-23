import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip, IconButton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const WhatsAppContact = () => {
    const navigate = useNavigate();
    const phoneNumber = "919909109074"; // Verified contact number
    const message = encodeURIComponent("Hello Loupe Jewellery! I'm interested in your collections.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <Box
            component={motion.div}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1.5
            }}
            sx={{
                position: 'fixed',
                bottom: { xs: '18px', sm: '30px' },
                right: { xs: '18px', sm: '30px' },
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                gap: { xs: '10px', sm: '14px' }
            }}
        >
            

            {/* ============================================================== */}
            {/* 2. WHATSAPP CHAT BUTTON                                        */}
            {/* ============================================================== */}
            <Tooltip title="Chat with Expertise" placement="top" arrow>
                <Box
                    component={motion.div}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                >
                    <IconButton
                        component="a"
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Chat on WhatsApp"
                        sx={{
                            width: { xs: 50, sm: 65 },
                            height: { xs: 50, sm: 65 },
                            bgcolor: '#25D366',
                            color: 'white',
                            boxShadow: '0 8px 32px rgba(37, 211, 102, 0.4)',
                            border: { xs: '3px solid white', sm: '4px solid white' },
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                bgcolor: '#128C7E',
                                boxShadow: '0 12px 40px rgba(37, 211, 102, 0.6)',
                            }
                        }}
                    >
                        <i className="fa-brands fa-whatsapp" style={{ fontSize: '26px' }}></i>
                    </IconButton>
                </Box>
            </Tooltip>
        </Box>
    );
};

export default WhatsAppContact;

import React, { useContext, useEffect, useState } from 'react';
import OrderTracker from './OrderTracker';
import { Box, Typography, Paper, Grid, IconButton, Button, Divider } from "@mui/material";
import {
    Star,
    MapPin,
    Phone,
    Truck,
    ChevronLeft,
    Info,
    ShoppingBag,
    ShieldCheck
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../../state/order/Action';
import { useNavigate, useParams } from 'react-router-dom';
import RatingReviewForm from './RatingReviewForm';
import { RRContext } from '../../../context/rrBox/rrContext';
import { formatPriceINR } from '../../../utils/price';
import { motion, AnimatePresence } from 'framer-motion';

const OrderDetails = () => {
    const { order } = useSelector(store => store);
    const dispatch = useDispatch();
    const params = useParams();
    const index = parseInt(params.index);
    const navigate = useNavigate();
    const modal = useContext(RRContext);
    const [activeStep, setActiveStep] = useState(1);

    useEffect(() => {
        dispatch(getOrderById(params.orderId));

        // Set up polling for real-time updates every 30 seconds
        const interval = setInterval(() => {
            dispatch(getOrderById(params.orderId));
        }, 30000);

        return () => clearInterval(interval);
    }, [dispatch, params.orderId]);

    useEffect(() => {
        if (!order || !order.order?.orderStatus) return;

        let newActiveStep;
        switch (order.order?.orderStatus) {
            case "PLACED": newActiveStep = 1; break;
            case "CONFIRMED": newActiveStep = 2; break;
            case "SHIPPED": newActiveStep = 4; break;
            case "DELIVERED": newActiveStep = 5; break;
            case "CANCELED":
            case "CANCELLED": newActiveStep = 0; break;
            default: newActiveStep = 1;
        }
        setActiveStep(newActiveStep);
    }, [order?.order?.orderStatus]);

    const handleOpen = () => {
        navigate(`/product/${order.order?.orderItems[index]?.product._id}/ratrev`)
        modal.openModal();
    };

    const handleClose = () => {
        modal.closeModal();
    };

    const { firstName, lastName, streetAddress, city, zipCode, mobile, state } = order.order?.shippingAddress || {};

    return (
        <Box sx={{ p: { xs: 2, md: 4, lg: 6 }, bgcolor: '#f1f5f9', minHeight: '100vh' }}>
            <div className="max-w-6xl mx-auto space-y-8">

                {/* 1. Header Navigation & Breadcrumb */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Button
                        onClick={() => navigate('/user-details/?layout=2')}
                        startIcon={<ChevronLeft size={18} />}
                        sx={{ color: '#64748b', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5, fontSize: '0.7rem' }}
                    >
                        Back to Registry
                    </Button>
                    <Box className="flex items-center gap-2">
                        <Info size={14} className="text-[#755970]" />
                        <Typography sx={{ fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2 }}>
                            Order ID: {params.orderId?.slice(-8).toUpperCase()}
                        </Typography>
                    </Box>
                </Box>

                {/* 2. Glassmorphic Tracking Core */}
                <Box>
                    <Typography sx={{ fontSize: '2.5rem', fontFamily: "'Playfair Display', serif", color: '#755970', mb: 4, fontWeight: 300 }}>
                        Journey of your <span className="italic">Treasures</span>
                    </Typography>
                    <OrderTracker activeStep={activeStep} />
                </Box>

                <Grid container spacing={4}>
                    {/* 3. High-Fidelity Order Item Card */}
                    <Grid item xs={12} md={8}>
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    borderRadius: '32px',
                                    border: '1px solid #f1f5f9',
                                    bgcolor: 'white',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}
                            >
                                <div className="flex flex-col sm:flex-row gap-8 items-start">
                                    {/* Portrait Item Frame */}
                                    <Box sx={{
                                        width: { xs: '100%', sm: 160 },
                                        aspectRatio: '3/4',
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                                    }}>
                                        <img
                                            className="w-full h-full object-cover"
                                            src={
                                                Array.isArray(order.order?.orderItems[index]?.product?.imageUrls) && order.order?.orderItems[index]?.product?.imageUrls.length > 0
                                                    ? (order.order?.orderItems[index]?.product?.imageUrls[0]?.imageUrl || order.order?.orderItems[index]?.product?.imageUrls[0])
                                                    : "https://res.cloudinary.com/deq0hxr3t/image/upload/v1709462235/no-found_mnvvpf.svg"
                                            }
                                            alt="product"
                                        />
                                    </Box>

                                    {/* Item Narrative */}
                                    <Box sx={{ flexGrow: 1, py: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                            <Typography sx={{ fontSize: '1.4rem', fontWeight: 300, fontFamily: "'Playfair Display', serif", color: '#755970' }}>
                                                {order.order?.orderItems[index]?.product.title}
                                            </Typography>
                                            <div className="px-3 py-1 bg-[#755970]/10 rounded-full">
                                                <Typography sx={{ fontSize: '0.6rem', color: '#755970', fontWeight: 900, letterSpacing: 1.5 }}>
                                                    {order.order?.orderStatus}
                                                </Typography>
                                            </div>
                                        </Box>

                                        <Typography sx={{ fontSize: '0.85rem', color: '#94a3b8', mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                            <span className="font-bold text-[#755970]">Weight:</span> {order.order?.orderItems[index]?.weight} G |
                                            <span className="font-bold text-[#755970]">Size:</span> {order.order?.orderItems[index]?.size} MM |
                                            <span className="font-bold text-[#755970]">Boutique:</span> {order.order?.orderItems[index]?.product.brand}
                                        </Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Box>
                                                <Typography sx={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1, mb: 0.5 }}>
                                                    Investment
                                                </Typography>
                                                <Typography sx={{ fontSize: '1.4rem', fontWeight: 900, color: '#755970', fontFamily: "'Outfit', sans-serif" }}>
                                                    ₹{formatPriceINR(order.order?.orderItems[index]?.product.discountedPrice)}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ h: 30, w: '1px', bgcolor: '#f1f5f9' }} />
                                            <Box>
                                                <Typography sx={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1, mb: 0.5 }}>
                                                    Member Benefit
                                                </Typography>
                                                <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#755970' }}>
                                                    Saved ₹{formatPriceINR(order.order?.orderItems[index]?.product.price - order.order?.orderItems[index]?.product.discountedPrice)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </div>

                                <Divider sx={{ my: 4, opacity: 0.5 }} />

                                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
                                    <Button
                                        onClick={handleOpen}
                                        variant="outlined"
                                        startIcon={<Star size={16} />}
                                        sx={{
                                            borderRadius: '16px',
                                            borderColor: '#f1f5f9',
                                            color: '#755970',
                                            px: 4,
                                            py: 1.5,
                                            fontSize: '0.75rem',
                                            fontWeight: 900,
                                            letterSpacing: 2,
                                            textTransform: 'uppercase',
                                            '&:hover': { bgcolor: '#f8fafc', borderColor: '#755970' }
                                        }}
                                    >
                                        Share Experience
                                    </Button>
                                </Box>
                            </Paper>
                        </motion.div>
                    </Grid>

                    {/* 4. Elite Delivery Registry Bento */}
                    <Grid item xs={12} md={4}>
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    borderRadius: '32px',
                                    bgcolor: '#755970',
                                    color: 'white',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <Box sx={{ position: 'absolute', top: -50, right: -50, w: 150, h: 150, bgcolor: 'rgba(151,194,213,0.1)', borderRadius: '50%' }} />

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                                    <Box sx={{ p: 1, borderRadius: '10px', bgcolor: '#755970' }}>
                                        <MapPin size={20} className="text-[#755970]" />
                                    </Box>
                                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 2 }}>
                                        Delivery Registry
                                    </Typography>
                                </Box>

                                <Box className="space-y-6">
                                    <Box>
                                        <Typography sx={{ fontSize: '1.2rem', fontWeight: 300, fontFamily: "'Playfair Display', serif", mb: 1 }}>
                                            {firstName} {lastName}
                                        </Typography>
                                        <Typography sx={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.6 }}>
                                            {streetAddress} <br />
                                            {city}, {state} <br />
                                            {zipCode}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Phone size={14} className="text-[#755970]" />
                                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 700 }}>{mobile}</Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            p: 2,
                                            borderRadius: '16px',
                                            bgcolor: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2
                                        }}
                                    >
                                        <ShieldCheck size={20} className="text-[#755970]" />
                                        <Box>
                                            <Typography sx={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1 }}>
                                                Secured Delivery
                                            </Typography>
                                            <Typography sx={{ fontSize: '0.6rem', opacity: 0.6 }}>
                                                Handled by our premium boutique logistics partners.
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Paper>
                        </motion.div>
                    </Grid>
                </Grid>

                {/* 5. Support CTA */}
                <Box sx={{ py: 4, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>
                        Need further assistance with this movement? <span className="text-[#755970] font-bold underline cursor-pointer" onClick={() => navigate('/user-details/?layout=3')}>Speak with Concierge</span>
                    </Typography>
                </Box>
            </div>

            <RatingReviewForm open={modal.state} handleClose={handleClose} />
        </Box>
    );
};

export default OrderDetails;

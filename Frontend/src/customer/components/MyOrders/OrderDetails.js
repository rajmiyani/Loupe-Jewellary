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
    ShieldCheck,
    AlertCircle,
    Clock
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById, cancelOrder } from '../../../state/order/Action';
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
    const [cancelError, setCancelError] = useState('');
    const [cancelSuccess, setCancelSuccess] = useState(false);

    // ─── Cancellation window logic ───────────────────────────────────────────
    const ORDER_CANCEL_DAYS = 3;
    const orderCreatedAt = order.order?.createdAt ? new Date(order.order.createdAt) : null;
    const now = new Date();
    const diffDays = orderCreatedAt ? (now - orderCreatedAt) / (1000 * 60 * 60 * 24) : Infinity;
    const canCancel = diffDays <= ORDER_CANCEL_DAYS;
    const daysRemaining = orderCreatedAt ? Math.max(0, Math.ceil(ORDER_CANCEL_DAYS - diffDays)) : 0;
    // ─────────────────────────────────────────────────────────────────────────

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
        if (orderItem?.product?._id) {
            navigate(`/product/${orderItem.product._id}/ratrev`)
            modal.openModal();
        }
    };

    const handleClose = () => {
        modal.closeModal();
    };

    const { firstName, lastName, streetAddress, city, zipCode, mobile, state } = order.order?.shippingAddress || {};

    if (order.loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 300, color: '#3c7399' }}>Loading your Treasures...</Typography>
            </Box>
        );
    }

    const orderItem = order.order?.orderItems?.[index];

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
                    <Box className="flex items-center gap-4">
                        <Button
                            variant="outlined"
                            startIcon={<img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" width="16" />}
                            onClick={() => {
                                const message = `Hello Loupe Jeweller, I'd like to get the invoice for my order ${params.orderId?.toUpperCase()}.\n\nCustomer: ${firstName} ${lastName}\nProduct: ${orderItem?.product?.title}\nPrice: ₹${formatPriceINR(orderItem?.product?.discountedPrice)}\nMobile: ${mobile}`;
                                window.open(`https://wa.me/919909109074?text=${encodeURIComponent(message)}`, '_blank');
                            }}
                            sx={{
                                borderRadius: '12px',
                                borderColor: '#25D366',
                                color: '#25D366',
                                fontSize: '0.65rem',
                                fontWeight: 800,
                                px: 2,
                                '&:hover': { bgcolor: '#25D366', color: 'white', borderColor: '#25D366' }
                            }}
                        >
                            WhatsApp Invoice
                        </Button>
                        <Box className="flex items-center gap-2">
                            <Info size={14} className="text-[#3c7399]" />
                            <Typography sx={{ fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2 }}>
                                Order ID: {params.orderId?.slice(-8).toUpperCase()}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* 2. Glassmorphic Tracking Core */}
                <Box>
                    <Typography sx={{ fontSize: '2.5rem', fontFamily: "'Playfair Display', serif", color: '#3c7399', mb: 4, fontWeight: 300 }}>
                        Journey of your <span className="italic">Treasures</span>
                    </Typography>

                    {order.order?.adminMessage && (
                        <Box sx={{ mb: 4, p: 3, borderRadius: '24px', bgcolor: '#fef2f2', border: '1px solid #fee2e2', display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: '#ef4444', color: 'white' }}>
                                <Info size={24} />
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: 1 }}>
                                    Message from Boutique Manager
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#b91c1c', fontWeight: 500 }}>
                                    {order.order?.adminMessage}
                                </Typography>
                            </Box>
                        </Box>
                    )}

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
                                                Array.isArray(orderItem?.product?.imageUrls) && orderItem?.product?.imageUrls.length > 0
                                                    ? (orderItem?.product?.imageUrls[0]?.imageUrl || orderItem?.product?.imageUrls[0])
                                                    : "https://res.cloudinary.com/deq0hxr3t/image/upload/v1709462235/no-found_mnvvpf.svg"
                                            }
                                            alt="product"
                                        />
                                    </Box>

                                    {/* Item Narrative */}
                                    <Box sx={{ flexGrow: 1, py: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                            <Typography sx={{ fontSize: '1.4rem', fontWeight: 300, fontFamily: "'Playfair Display', serif", color: '#3c7399' }}>
                                                {orderItem?.product?.title}
                                            </Typography>
                                            <div className="px-3 py-1 bg-[#3c7399]/10 rounded-full">
                                                <Typography sx={{ fontSize: '0.6rem', color: '#3c7399', fontWeight: 900, letterSpacing: 1.5 }}>
                                                    {order.order?.orderStatus}
                                                </Typography>
                                            </div>
                                        </Box>

                                        <Typography sx={{ fontSize: '0.85rem', color: '#94a3b8', mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                            <span className="font-bold text-[#3c7399]">Weight:</span> {orderItem?.weight ? `${orderItem.weight} G` : 'N/A'} |
                                            <span className="font-bold text-[#3c7399]">Size:</span> {orderItem?.size ? `${orderItem.size} MM` : 'N/A'} |
                                            <span className="font-bold text-[#3c7399]">Boutique:</span> {orderItem?.product?.brand}
                                        </Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Box>
                                                <Typography sx={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1, mb: 0.5 }}>
                                                    Investment
                                                </Typography>
                                                <Typography sx={{ fontSize: '1.4rem', fontWeight: 900, color: '#3c7399', fontFamily: "'Outfit', sans-serif" }}>
                                                    ₹{formatPriceINR(orderItem?.product?.discountedPrice)}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ h: 30, w: '1px', bgcolor: '#f1f5f9' }} />
                                            <Box>
                                                <Typography sx={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1, mb: 0.5 }}>
                                                    Member Benefit
                                                </Typography>
                                                <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#3c7399' }}>
                                                    Saved ₹{formatPriceINR((orderItem?.product?.price || 0) - (orderItem?.product?.discountedPrice || 0))}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </div>

                                {/* Cancel Order Section */}
                                {(order.order?.orderStatus === "PENDING" || order.order?.orderStatus === "PLACED" || order.order?.orderStatus === "CONFIRMED") && (
                                    <Box sx={{ mt: 4 }}>
                                        {/* Policy Note */}
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: 1.5,
                                                p: 2,
                                                borderRadius: '12px',
                                                bgcolor: canCancel ? '#f0fdf4' : '#fef2f2',
                                                border: `1px solid ${canCancel ? '#bbf7d0' : '#fecaca'}`,
                                                mb: 2
                                            }}
                                        >
                                            <Clock size={14} color={canCancel ? '#16a34a' : '#ef4444'} style={{ marginTop: 2, flexShrink: 0 }} />
                                            <Typography sx={{ fontSize: '0.75rem', color: canCancel ? '#15803d' : '#b91c1c', lineHeight: 1.6 }}>
                                                <strong>📌 Note – Cancellation Policy:</strong> Orders can be cancelled within{' '}
                                                <strong>{ORDER_CANCEL_DAYS} days</strong> of placement.{' '}
                                                {canCancel
                                                    ? <>You have <strong>{daysRemaining} day{daysRemaining !== 1 ? 's' : ''}</strong> remaining to cancel this order.</>  
                                                    : <>The cancellation window for this order has <strong>expired</strong>. For assistance, please contact our <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/user-details/?layout=3')}>Concierge team</span>.</>
                                                }
                                            </Typography>
                                        </Box>

                                        {/* Cancel Button */}
                                        {canCancel && (
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                onClick={() => {
                                                    if (window.confirm("Are you sure you want to cancel this order?")) {
                                                        setCancelError('');
                                                        dispatch(cancelOrder(params.orderId))
                                                            .then(() => setCancelSuccess(true))
                                                            .catch(err => setCancelError(err?.message || 'Cancellation failed.'));
                                                    }
                                                }}
                                                sx={{
                                                    borderRadius: '14px',
                                                    bgcolor: '#fef2f2',
                                                    color: '#ef4444',
                                                    border: '1px solid #fecaca',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 800,
                                                    py: 1.5,
                                                    boxShadow: 'none',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: 1.5,
                                                    '&:hover': {
                                                        bgcolor: '#ef4444',
                                                        color: 'white',
                                                        borderColor: '#ef4444',
                                                        boxShadow: '0 8px 24px rgba(239,68,68,0.25)'
                                                    }
                                                }}
                                            >
                                                Cancel Order
                                            </Button>
                                        )}

                                        {/* Error feedback */}
                                        {cancelError && (
                                            <Typography sx={{ mt: 1, fontSize: '0.7rem', color: '#ef4444', textAlign: 'center' }}>
                                                {cancelError}
                                            </Typography>
                                        )}
                                    </Box>
                                )}

                                <Divider sx={{ my: 4, opacity: 0.5 }} />

                                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
                                    <Button
                                        onClick={handleOpen}
                                        variant="outlined"
                                        startIcon={<Star size={16} />}
                                        sx={{
                                            borderRadius: '16px',
                                            borderColor: '#f1f5f9',
                                            color: '#3c7399',
                                            px: 4,
                                            py: 1.5,
                                            fontSize: '0.75rem',
                                            fontWeight: 900,
                                            letterSpacing: 2,
                                            textTransform: 'uppercase',
                                            '&:hover': { bgcolor: '#f8fafc', borderColor: '#3c7399' }
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
                                    bgcolor: '#3c7399',
                                    color: 'white',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <Box sx={{ position: 'absolute', top: -50, right: -50, w: 150, h: 150, bgcolor: 'rgba(151,194,213,0.1)', borderRadius: '50%' }} />

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                                    <Box sx={{ p: 1, borderRadius: '10px', bgcolor: '#3c7399' }}>
                                        <MapPin size={20} className="text-[#3c7399]" />
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
                                        <Phone size={14} className="text-[#3c7399]" />
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
                                        <ShieldCheck size={20} className="text-[#3c7399]" />
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
                        Need further assistance with this movement? <span className="text-[#3c7399] font-bold underline cursor-pointer" onClick={() => navigate('/user-details/?layout=3')}>Speak with Concierge</span>
                    </Typography>
                </Box>
            </div>

            <RatingReviewForm open={modal.state} handleClose={handleClose} />
        </Box>
    );
};

export default OrderDetails;

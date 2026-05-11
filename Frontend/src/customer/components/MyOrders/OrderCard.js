import { Box, Typography, Paper, Grid, Badge } from "@mui/material";
import React from "react";
import { ChevronRight, Package, Truck, CheckCircle2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatPriceINR } from "../../../utils/price";

const OrderCard = ({ item, orderId, index, orderDate, orderStatus }) => {
    const navigate = useNavigate();

    const getStatusConfig = (status) => {
        switch (status) {
            case 'DELIVERED':
                return { label: 'Delivered', color: '#10b981', bg: '#ecfdf5', icon: <CheckCircle2 size={14} /> };
            case 'SHIPPED':
                return { label: 'Shipped', color: '#3b82f6', bg: '#eff6ff', icon: <Truck size={14} /> };
            default:
                return { label: 'Processing', color: '#f59e0b', bg: '#fffbeb', icon: <Clock size={14} /> };
        }
    };

    const status = getStatusConfig(orderStatus);

    return (
        <Paper
            elevation={0}
            onClick={() => navigate(`/account/orders/${orderId}/${index}`)}
            sx={{
                p: { xs: 2.5, md: 3 },
                borderRadius: '20px',
                border: '1px solid #f1f5f9',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    boxShadow: '0 15px 35px rgba(30, 41, 59, 0.08)',
                    borderColor: '#97c2d5',
                    transform: 'translateY(-4px)'
                }
            }}
        >
            <Grid container spacing={3} alignItems="center">
                {/* 1. Portrait Product Image */}
                <Grid item xs={12} sm={3} md={2}>
                    <Box
                        sx={{
                            width: '100%',
                            aspectRatio: '1/1',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.04)'
                        }}
                    >
                        <img
                            src={
                                Array.isArray(item.product?.imageUrls) && item.product?.imageUrls.length > 0
                                    ? (item.product?.imageUrls[0]?.imageUrl || item.product?.imageUrls[0])
                                    : "https://res.cloudinary.com/deq0hxr3t/image/upload/v1709462235/no-found_mnvvpf.svg"
                            }
                            alt={item.product?.title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                    </Box>
                </Grid>

                {/* 2. Order Metadata */}
                <Grid item xs={12} sm={6} md={7}>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: '1.1rem',
                                fontWeight: 300,
                                fontFamily: "'Playfair Display', serif",
                                color: '#1e293b',
                                mb: 0.5
                            }}
                        >
                            {item.product?.title}
                        </Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic', mb: 1.5 }}>
                            Boutique Selection • {item.product?.brand || "Loupe Jeweller"}
                        </Typography>

                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex flex-col">
                                <span className="text-[0.6rem] font-black uppercase tracking-wider text-gray-400">Price</span>
                                <span className="text-[1rem] font-serif italic text-[#1e293b]">₹{formatPriceINR(item?.discountedPrice)}</span>
                            </div>
                            <div className="w-[1px] h-6 bg-gray-100 hidden sm:block" />
                            <div className="flex flex-col">
                                <span className="text-[0.6rem] font-black uppercase tracking-wider text-gray-400">Quantity</span>
                                <span className="text-[0.85rem] font-bold text-[#64748b]">{item.quantity || 1} Piece</span>
                            </div>
                        </div>
                    </Box>
                </Grid>

                {/* 3. Status Badge & Action */}
                <Grid item xs={12} sm={3} md={3}>
                    <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3 shadow-sm border border-transparent"
                            style={{ backgroundColor: status.bg, color: status.color }}
                        >
                            {status.icon}
                            <span className="text-[0.7rem] font-black uppercase tracking-tighter">{status.label}</span>
                        </div>
                        <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', sm: 'flex-end' }, gap: 0.5 }}>
                            Ordered {orderDate} <ChevronRight size={14} />
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default OrderCard;

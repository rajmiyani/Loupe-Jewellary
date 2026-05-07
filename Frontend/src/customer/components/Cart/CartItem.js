import React from 'react';
import { IconButton, Box, Typography, Divider } from '@mui/material';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { removeCartItem, updateCartItem } from '../../../state/cart/Action';
import { formatPriceINR } from '../../../utils/price';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleUpdateCartItem = (num) => {
        const data = { data: { quantity: item.quantity + num }, cartItemId: item?._id }
        dispatch(updateCartItem(data))
    }

    const handleRemoveCartItem = () => {
        dispatch(removeCartItem(item._id));
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className='p-6 mb-6 bg-white rounded-3xl border border-[#f1f5f9] hover:shadow-xl transition-all duration-300'
        >
            <Box sx={{ display: 'flex', gap: 3 }}>
                <Box sx={{ width: 140, height: 140, flexShrink: 0, borderRadius: '20px', overflow: 'hidden', bgcolor: '#f8fafc' }}>
                    <img src={item.product?.imageUrls?.[0]?.imageUrl} className='w-full h-full object-cover' alt={item.product?.title} />
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--text-dark)' }}>
                                {item.product?.title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                                {item.product?.brand}
                            </Typography>
                        </Box>

                        <IconButton onClick={handleRemoveCartItem} size="small" sx={{ color: '#ef4444' }}>
                            <Trash2 size={18} />
                        </IconButton>
                    </Box>

                    <Typography variant="body2" sx={{ my: 1, color: 'text.secondary', fontWeight: 500 }}>
                        Weight: {item.weight} | Size: {item.width} MM
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--primary-burgundy)' }}>
                            ₹{formatPriceINR(item.discountedPrice)}
                        </Typography>
                        <Typography variant="body2" sx={{ textDecoration: 'line-through', opacity: 0.5 }}>
                            ₹{formatPriceINR(item.price)}
                        </Typography>
                        <Typography variant="caption" sx={{ bgcolor: '#dcfce7', color: '#166534', px: 1, py: 0.5, borderRadius: '6px', fontWeight: 700 }}>
                            {item.product?.discountPercent}% OFF
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f8fafc', borderRadius: '12px', p: 0.5 }}>
                            <IconButton
                                size="small"
                                disabled={item.quantity <= 1}
                                onClick={() => handleUpdateCartItem(-1)}
                                sx={{ color: 'var(--primary-burgundy)' }}
                            >
                                <Minus size={16} />
                            </IconButton>
                            <Typography sx={{ px: 2, fontWeight: 700, minWidth: 40, textAlign: 'center' }}>
                                {item.quantity}
                            </Typography>
                            <IconButton
                                size="small"
                                onClick={() => handleUpdateCartItem(1)}
                                sx={{ color: 'var(--primary-burgundy)' }}
                            >
                                <Plus size={16} />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </motion.div>
    )
}

export default CartItem;

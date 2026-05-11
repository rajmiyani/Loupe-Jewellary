import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { Button, Box, Typography, Divider, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ArrowRight, ShoppingCart } from 'lucide-react'
import { getCart } from '../../../state/cart/Action'
import { formatPriceINR } from '../../../utils/price'

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart, auth } = useSelector(store => store);

    useEffect(() => {
        dispatch(getCart());
    }, [cart.updateCartItem, cart.deleteCartItem, cart.cartItems])

    const handleCheckout = () => {
        navigate('/checkout/?step=2');
    }

    return (
        <div className="bg-[#fafafa] min-h-screen pt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 mb-10"
                >
                    <ShoppingBag size={32} className="text-[var(--primary-blue)]" />
                    <Typography variant="h3" sx={{ fontWeight: 800, color: 'var(--text-dark)' }}>
                        Luxurious Cart
                    </Typography>
                </motion.div>

                {cart.cart?.cartItems?.length > 0 ? (
                    <Grid container spacing={6}>
                        {/* Cart Items List */}
                        <Grid item xs={12} lg={8}>
                            <AnimatePresence>
                                {cart.cart.cartItems.map((item) => (
                                    <CartItem key={item._id} item={item} />
                                ))}
                            </AnimatePresence>

                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                <Button
                                    onClick={() => navigate('/')}
                                    variant="text"
                                    sx={{
                                        color: 'var(--primary-blue)',
                                        fontWeight: 700,
                                        '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
                                    }}
                                >
                                    Continue Exploring Collections
                                </Button>
                            </Box>
                        </Grid>

                        {/* Order Summary Sidebar */}
                        <Grid item xs={12} lg={4}>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="sticky top-24"
                            >
                                <Box sx={{
                                    p: 4,
                                    bgcolor: 'white',
                                    borderRadius: '32px',
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                                    border: '1px solid #f1f5f9'
                                }}>
                                    <Typography variant="h5" sx={{ mb: 4, fontWeight: 800, color: 'var(--primary-blue)' }}>
                                        Order Summary
                                    </Typography>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography color="textSecondary" fontWeight="600">Subtotal</Typography>
                                            <Typography fontWeight="700">₹{formatPriceINR(cart.cart.totalPrice)}</Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography color="textSecondary" fontWeight="600">Exclusive Discount</Typography>
                                            <Typography sx={{ color: '#10b981', fontWeight: 800 }}>-{cart.cart.discount}%</Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography color="textSecondary" fontWeight="600">Delivery</Typography>
                                            <Typography sx={{ color: '#10b981', fontWeight: 800 }}>Complimentary</Typography>
                                        </Box>

                                        <Divider sx={{ my: 1 }} />

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="h6" fontWeight="800">Total Amount</Typography>
                                            <Typography variant="h5" sx={{ fontWeight: 900, color: 'var(--primary-blue)' }}>
                                                ₹{formatPriceINR(cart.cart.totalDiscountedPrice)}
                                            </Typography>
                                        </Box>

                                        <Typography variant="caption" sx={{ textAlign: 'center', opacity: 0.6, mt: 1 }}>
                                            Taxes and duties included
                                        </Typography>

                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                            <Button
                                                onClick={handleCheckout}
                                                fullWidth
                                                variant="contained"
                                                endIcon={<ArrowRight size={20} />}
                                                sx={{
                                                    mt: 2,
                                                    py: 2,
                                                    borderRadius: '16px',
                                                    bgcolor: '#1e293b',
                                                    fontWeight: 800,
                                                    fontSize: '1.1rem',
                                                    textTransform: 'none',
                                                    '&:hover': { bgcolor: '#97c2d5' },
                                                    boxShadow: '0 10px 30px rgba(30,41,59,0.18)'
                                                }}
                                            >
                                                Proceed to Checkout
                                            </Button>
                                        </motion.div>
                                    </Box>
                                </Box>

                                <Box sx={{ mt: 4, p: 3, bgcolor: 'var(--bg-premium)', borderRadius: '20px', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ bgcolor: 'var(--primary-gold)', p: 1, borderRadius: '8px', color: 'var(--primary-blue)' }}>
                                        <Typography variant="h6" fontWeight="900">✨</Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--primary-blue)' }}>
                                        Secure your master pieces today. Fast & Insured delivery.
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-20 px-4 text-center"
                    >
                        <Box sx={{
                            width: 200,
                            height: 200,
                            bgcolor: 'white',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 6,
                            shadow: 2
                        }}>
                            <ShoppingCart size={80} className="text-gray-200" />
                        </Box>

                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: 'var(--text-dark)' }}>
                            Your cart is awaits treasures
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 6, maxWidth: 400 }}>
                            It seems you haven't added any of our handcrafted pieces to your collection yet.
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 3 }}>
                            <Button
                                onClick={() => navigate('/')}
                                variant="contained"
                                sx={{
                                    px: 6,
                                    py: 1.5,
                                    borderRadius: '12px',
                                    bgcolor: '#1e293b',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    '&:hover': { bgcolor: '#97c2d5' }
                                }}
                            >
                                Start Shopping
                            </Button>

                            {!auth.user && (
                                <Button
                                    onClick={() => navigate('/login')}
                                    variant="outlined"
                                    sx={{
                                        px: 6,
                                        py: 1.5,
                                        borderRadius: '12px',
                                        color: 'var(--primary-blue)',
                                        borderColor: 'var(--primary-blue)',
                                        fontWeight: 700,
                                        textTransform: 'none'
                                    }}
                                >
                                    Login to Retrieve Items
                                </Button>
                            )}
                        </Box>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default Cart

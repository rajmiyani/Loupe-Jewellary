import { Button, Card, CardContent, Typography, Box } from '@mui/material'
import React from 'react'
import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'

const Achivement = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <Card
                sx={{
                    position: "relative",
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, var(--primary-burgundy) 0%, var(--primary-burgundy-light) 100%)',
                    color: 'white',
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(80, 7, 36, 0.2)'
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <Typography variant='h6' sx={{ letterSpacing: "1px", fontWeight: 700, color: 'var(--primary-gold)' }}>
                        Loupe Jewellery
                    </Typography>

                    <Typography variant='body2' sx={{ opacity: 0.8, mt: 1 }}>
                        Congratulations on your milestones! 🥳
                    </Typography>

                    <Box sx={{ my: 4 }}>
                        <Typography variant='h3' fontWeight="bold" sx={{ color: 'var(--primary-gold)' }}>
                            420.8k
                        </Typography>
                        <Typography variant='body2' sx={{ opacity: 0.7 }}>
                            Lifetime Sales
                        </Typography>
                    </Box>

                    <Button
                        variant='contained'
                        sx={{
                            borderRadius: '12px',
                            bgcolor: 'var(--primary-gold)',
                            color: 'var(--primary-burgundy)',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            px: 3,
                            "&:hover": { bgcolor: "#fff", color: 'black' },
                        }}
                    >
                        View Statement
                    </Button>

                    <Box
                        sx={{
                            position: 'absolute',
                            right: -20,
                            bottom: -20,
                            opacity: 0.1,
                            transform: 'rotate(-15deg)'
                        }}
                    >
                        <Trophy size={180} color="white" />
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default Achivement

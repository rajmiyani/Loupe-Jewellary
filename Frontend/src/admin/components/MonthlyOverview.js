import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Package, Banknote, MoreVertical } from 'lucide-react'

const salesData = [
    {
        stats: '245k',
        title: 'Sales',
        color: '#f59e0b',
        icon: <TrendingUp size={24} />
    },
    {
        stats: '12.5k',
        title: 'Customers',
        color: '#10b981',
        icon: <Users size={24} />
    },
    {
        stats: '1.54k',
        title: 'Products',
        color: '#ef4444',
        icon: <Package size={24} />
    },
    {
        stats: '88k',
        title: 'Revenue',
        color: '#3b82f6',
        icon: <Banknote size={24} />
    },
]

const MonthlyOverview = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
        >
            <Card sx={{ borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%' }}>
                <CardHeader
                    title="Monthly Overview"
                    action={
                        <IconButton size='small'>
                            <MoreVertical size={20} />
                        </IconButton>
                    }
                    subheader={
                        <Typography variant='body2' sx={{ mt: 0.5 }}>
                            <Box component="span" sx={{ fontWeight: 600, color: '#10b981' }}>
                                Total 48.5% growth
                            </Box>
                            {' '}this month 😎
                        </Typography>
                    }
                    titleTypographyProps={{
                        sx: {
                            fontWeight: 700,
                            fontSize: '1.25rem',
                            letterSpacing: '0.5px',
                        }
                    }}
                />

                <CardContent sx={{ pt: 4 }}>
                    <Grid container spacing={4}>
                        {salesData.map((item, index) => (
                            <Grid item xs={6} md={3} key={index}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Avatar
                                        variant='rounded'
                                        sx={{
                                            mr: 2,
                                            width: 48,
                                            height: 48,
                                            bgcolor: `${item.color}15`,
                                            color: item.color,
                                            borderRadius: '12px'
                                        }}
                                    >
                                        {item.icon}
                                    </Avatar>

                                    <Box>
                                        <Typography variant='caption' sx={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.6 }}>
                                            {item.title}
                                        </Typography>
                                        <Typography variant='h6' sx={{ fontWeight: 700 }}>
                                            {item.stats}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default MonthlyOverview

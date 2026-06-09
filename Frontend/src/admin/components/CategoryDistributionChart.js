import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

const COLORS = ['#3c7399', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const CategoryDistributionChart = () => {
    const { adminDashboard } = useSelector(store => store);
    const categoryDistribution = adminDashboard?.categoryDistribution || [];

    // Filter out items with 0 sales for a cleaner look
    const chartData = categoryDistribution.filter(item => item.sales > 0);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <Card sx={{ borderRadius: '24px', boxShadow: '0 4px 25px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9', bgcolor: '#ffffff', height: '100%' }}>
                <Box sx={{ p: 3.5, borderBottom: '1px solid #f8fafc' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 900, color: '#1e293b', letterSpacing: '-0.5px' }}>Category Distribution</Typography>
                        <Box sx={{ px: 1.5, py: 0.4, borderRadius: '8px', bgcolor: '#f0fdf4', color: '#10b981', fontSize: '0.7rem', fontWeight: 800 }}>SALES</Box>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>Total Sales (Products) by Category</Typography>
                </Box>
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ height: 300, width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="sales"
                                    stroke="none"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                                    formatter={(value) => [`₹${value}`, 'Sales']}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    align="center"
                                    iconType="circle"
                                    formatter={(value) => <span style={{ color: '#64748b', fontWeight: 700, fontSize: '0.8rem' }}>{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default CategoryDistributionChart

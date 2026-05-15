import { Card, CardContent, Typography, Box } from '@mui/material'
import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const productSalesData = [
    { name: 'Rings', value: 400 },
    { name: 'Necklaces', value: 300 },
    { name: 'Earrings', value: 300 },
    { name: 'Bracelets', value: 200 },
]

const COLORS = ['#755970', '#3b82f6', '#fbbf24', '#10b981']

const Achivement = () => {
    const { adminDashboard } = useSelector(store => store);
    const stats = adminDashboard?.stats;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ height: '100%' }}
        >
            <Card sx={{ borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>Total Sales (Products)</Typography>
                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>CATEGORY DISTRIBUTION</Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1, minHeight: 250, position: 'relative' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={productSalesData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={100}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {productSalesData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={6} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                                    itemStyle={{ fontWeight: 700, fontSize: '0.8rem' }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    align="center"
                                    iconType="circle"
                                    layout="horizontal"
                                    formatter={(value) => <span style={{ color: '#64748b', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <Box sx={{ position: 'absolute', top: '44%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 900, color: '#1e293b', letterSpacing: '-1px' }}>
                                {(stats?.totalOrders || 0).toLocaleString()}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Orders Placed</Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default Achivement

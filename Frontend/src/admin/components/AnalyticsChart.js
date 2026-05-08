import React from 'react'
import { Card, CardContent, Typography, Box, Button, ButtonGroup } from '@mui/material'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { motion } from 'framer-motion'
import { Calendar, ChevronDown } from 'lucide-react'

const data = [
    { name: 'Mon', Revenue: 4000, Sales: 2400, Cancel: 240 },
    { name: 'Tue', Revenue: 3000, Sales: 1398, Cancel: 139 },
    { name: 'Wed', Revenue: 2000, Sales: 9800, Cancel: 980 },
    { name: 'Thu', Revenue: 2780, Sales: 3908, Cancel: 390 },
    { name: 'Fri', Revenue: 1890, Sales: 4800, Cancel: 480 },
    { name: 'Sat', Revenue: 2390, Sales: 3800, Cancel: 380 },
    { name: 'Sun', Revenue: 3490, Sales: 4300, Cancel: 430 },
]

const AnalyticsChart = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <Card sx={{ borderRadius: '24px', boxShadow: '0 4px 25px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9', overflow: 'visible', bgcolor: '#ffffff' }}>
                <Box sx={{ p: 3.5, borderBottom: '1px solid #f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                            <Typography variant="h6" sx={{ fontWeight: 900, color: '#1e293b', letterSpacing: '-0.5px' }}>Performance Analysis</Typography>
                            <Box sx={{ px: 1.5, py: 0.4, borderRadius: '8px', bgcolor: '#f0f9ff', color: '#97c2d5', fontSize: '0.7rem', fontWeight: 800 }}>ANALYTICS</Box>
                        </Box>
                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>Visualizing revenue and sales trajectories</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <ButtonGroup variant="outlined" sx={{ borderRadius: '12px', overflow: 'hidden', '& .MuiButton-root': { borderColor: '#f1f5f9', textTransform: 'none', color: '#64748b', fontWeight: 700, px: 2 } }}>
                            <Button>Day</Button>
                            <Button sx={{ bgcolor: '#f0f9ff', color: '#97c2d5 !important', borderColor: '#e0f2f1 !important' }}>Week</Button>
                            <Button>Month</Button>
                        </ButtonGroup>
                        <Button
                            variant="outlined"
                            startIcon={<Calendar size={16} />}
                            endIcon={<ChevronDown size={16} />}
                            sx={{ borderRadius: '12px', textTransform: 'none', borderColor: '#f1f5f9', color: '#64748b', fontWeight: 700, px: 2, '&:hover': { borderColor: '#97c2d5', bgcolor: 'transparent' } }}
                        >
                            Oct 2024
                        </Button>
                    </Box>
                </Box>
                <CardContent sx={{ p: 4, pt: 2 }}>

                    <Box sx={{ height: 350, width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#97c2d5" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#97c2d5" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                                    itemStyle={{ fontWeight: 700 }}
                                />
                                <Legend
                                    verticalAlign="top"
                                    align="right"
                                    height={36}
                                    iconType="circle"
                                    formatter={(value) => <span style={{ color: '#64748b', fontWeight: 700, fontSize: '0.8rem' }}>{value}</span>}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="Revenue"
                                    stroke="#97c2d5"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorRev)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="Sales"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default AnalyticsChart

import React, { useState } from 'react'
import { Card, CardContent, Typography, Box, Button, ButtonGroup, FormControl, Select, MenuItem } from '@mui/material'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Calendar, ChevronDown } from 'lucide-react'

const AnalyticsChart = () => {
    const { adminDashboard } = useSelector(store => store);
    const weeklyStats = adminDashboard?.weeklyStats || [];
    
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <Select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                displayEmpty
                                sx={{ borderRadius: '12px', fontWeight: 700, fontSize: '0.85rem', bgcolor: '#f8fafc', color: '#64748b', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#f1f5f9' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#97c2d5' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#97c2d5' } }}
                            >
                                {[{ value: '', label: 'All Months' }, { value: '0', label: 'Jan' }, { value: '1', label: 'Feb' }, { value: '2', label: 'Mar' }, { value: '3', label: 'Apr' }, { value: '4', label: 'May' }, { value: '5', label: 'Jun' }, { value: '6', label: 'Jul' }, { value: '7', label: 'Aug' }, { value: '8', label: 'Sep' }, { value: '9', label: 'Oct' }, { value: '10', label: 'Nov' }, { value: '11', label: 'Dec' }].map(m => (
                                    <MenuItem key={m.value} value={m.value} sx={{ fontWeight: 700 }}>{m.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl size="small" sx={{ minWidth: 100 }}>
                            <Select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                sx={{ borderRadius: '12px', fontWeight: 700, fontSize: '0.85rem', bgcolor: '#f8fafc', color: '#64748b', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#f1f5f9' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#97c2d5' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#97c2d5' } }}
                            >
                                {[2024, 2025, 2026].map(y => (
                                    <MenuItem key={y} value={y} sx={{ fontWeight: 700 }}>{y}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <CardContent sx={{ p: 4, pt: 2 }}>

                    <Box sx={{ height: 350, width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={weeklyStats.length > 0 ? weeklyStats : []}>
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

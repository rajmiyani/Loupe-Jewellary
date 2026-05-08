import { Grid, Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import Achivement from './Achivement'
import MonthlyOverview from './MonthlyOverview'
import AnalyticsChart from './AnalyticsChart'
import OrdersTableView from '../view/OrderTableView'
import ProductsTableView from '../view/ProductTableView'
import { motion } from 'framer-motion'

const AdminDashboard = () => {
  const { auth } = useSelector(store => store);
  const firstName = auth.user?.firstName || "Admin";

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            color: '#111827',
            letterSpacing: '-0.5px'
          }}
        >
          Executive Overview
        </Typography>
        <Typography variant="body2" sx={{ color: '#94a3b8', mt: 1, fontWeight: 500 }}>
          Welcome back, {firstName}. Here is the latest performance data for Loupe Jewellery.
        </Typography>
      </Box>

      {/* Row 1: Metrics */}
      <Box sx={{ mb: 4 }}>
        <MonthlyOverview />
      </Box>

      <Grid container spacing={4}>
        {/* Row 2: Performance Analysis & Product Sales */}
        <Grid item xs={12} lg={8.5}>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <AnalyticsChart />
          </motion.div>
        </Grid>

        <Grid item xs={12} lg={3.5}>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Achivement />
          </motion.div>
        </Grid>

        {/* Row 3: Latest Orders (40%) & High Selling Products (60%) */}
        <Grid item xs={12} lg={4.8}>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Box sx={{ bgcolor: 'transparent', borderRadius: '24px', overflow: 'hidden' }}>
              <OrdersTableView />
            </Box>
          </motion.div>
        </Grid>

        <Grid item xs={12} lg={7.2}>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Box sx={{ bgcolor: 'transparent', borderRadius: '24px', overflow: 'hidden' }}>
              <ProductsTableView />
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminDashboard

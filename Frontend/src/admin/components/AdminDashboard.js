import { Grid, Box, Typography } from '@mui/material'
import React from 'react'
import Achivement from './Achivement'
import MonthlyOverview from './MonthlyOverview'
import OrdersTableView from '../view/OrderTableView'
import ProductsTableView from '../view/ProductTableView'
import { motion } from 'framer-motion'

const AdminDashboard = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 800, color: 'var(--primary-burgundy)' }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Achivement />
        </Grid>

        <Grid item xs={12} md={8}>
          <MonthlyOverview />
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box sx={{ bgcolor: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <OrdersTableView />
            </Box>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Box sx={{ bgcolor: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <ProductsTableView />
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminDashboard

import { Grid, Box, Typography, InputBase, Button, ButtonGroup, Select, MenuItem, FormControl, Chip } from '@mui/material'
import React, { useState, createContext, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MonthlyOverview from './MonthlyOverview'
import Achivement from './Achivement'
import OrdersTableView from '../view/OrderTableView'
import ProductsTableView from '../view/ProductTableView'
import { motion } from 'framer-motion'
import { Search, X, Filter } from 'lucide-react'
import { useEffect } from 'react'
import { getDashboardStats, getLatestOrders, getWeeklyStats, getAllProducts, getCategoryDistribution } from '../../state/admin/dashboard/Action'
import SalesCategoryDistribution from './SalesCategoryDistribution'
import GoldPriceWidget from './GoldPriceWidget'

export const DashboardContext = createContext({
  searchQuery: '',
  statusFilter: 'all',
  selectedMonth: '',
  selectedYear: new Date().getFullYear(),
});
export const useDashboard = () => useContext(DashboardContext);

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2];
const MONTHS = [
  { value: '', label: 'All Months' },
  { value: '0', label: 'January' }, { value: '1', label: 'February' },
  { value: '2', label: 'March' }, { value: '3', label: 'April' },
  { value: '4', label: 'May' }, { value: '5', label: 'June' },
  { value: '6', label: 'July' }, { value: '7', label: 'August' },
  { value: '8', label: 'September' }, { value: '9', label: 'October' },
  { value: '10', label: 'November' }, { value: '11', label: 'December' },
];
const STATUS_FILTERS = ['all', 'placed', 'confirmed', 'shipped', 'delivered', 'cancelled'];
const STATUS_COLORS = {
  all: { bg: '#f0f9ff', color: '#755970', activeBg: '#755970', activeColor: '#fff' },
  placed: { bg: '#fffbeb', color: '#d4af37', activeBg: '#d4af37', activeColor: '#fff' },
  confirmed: { bg: '#fef3c7', color: '#d97706', activeBg: '#d97706', activeColor: '#fff' },
  shipped: { bg: '#e0e7ff', color: '#4338ca', activeBg: '#4338ca', activeColor: '#fff' },
  delivered: { bg: '#f0fdf4', color: '#10b981', activeBg: '#10b981', activeColor: '#fff' },
  cancelled: { bg: '#fff1f2', color: '#f43f5e', activeBg: '#f43f5e', activeColor: '#fff' },
};

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { auth, adminDashboard } = useSelector(store => store);
  const firstName = auth.user?.firstName || "Admin";

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);

  useEffect(() => {
    dispatch(getDashboardStats());
    dispatch(getLatestOrders());
    dispatch(getWeeklyStats());
    dispatch(getAllProducts());
    dispatch(getCategoryDistribution());
  }, [dispatch]);

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setSelectedMonth('');
    setSelectedYear(CURRENT_YEAR);
  };

  const hasActiveFilters = searchQuery || statusFilter !== 'all' || selectedMonth !== '' || selectedYear !== CURRENT_YEAR;

  const contextValue = { searchQuery, statusFilter, selectedMonth, selectedYear };

  return (
    <DashboardContext.Provider value={contextValue}>
      <Box sx={{ p: { xs: 2, md: 0 } }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#111827', letterSpacing: '-0.5px' }}>
            Executive Overview
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8', mt: 0.5, fontWeight: 500 }}>
            Welcome back, {firstName}. Here is the latest performance data for Loupe Jewellery.
          </Typography>
        </Box>

        {/* Row 1: Metrics */}
        <Box sx={{ mb: 4 }}>
          <MonthlyOverview />
        </Box>

        {/* Gold Price Widget */}
        {/* <Box sx={{ mb: 4 }}>
          <GoldPriceWidget />
        </Box> */}

        <Grid container spacing={4}>
          {/* Row 2: Combined Sales Trend & Category Distribution */}
          <Grid item xs={12} lg={12}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <SalesCategoryDistribution />
            </motion.div>
          </Grid>

          {/* Row 3: Latest Orders (40%) & High Selling Products (60%) */}
          <Grid item xs={12} lg={4.8}>
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <Box sx={{ bgcolor: 'transparent', borderRadius: '24px', overflow: 'hidden' }}>
                <OrdersTableView />
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} lg={7.2}>
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <Box sx={{ bgcolor: 'transparent', borderRadius: '24px', overflow: 'hidden' }}>
                <ProductsTableView />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </DashboardContext.Provider>
  )
}

export default AdminDashboard

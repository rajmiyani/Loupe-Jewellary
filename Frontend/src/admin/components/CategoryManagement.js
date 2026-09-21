import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../state/category/Action';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Chip,
  Card,
  CardContent,
  Tooltip,
} from '@mui/material';
import { Edit2, Trash2, Plus, Tag, ChevronRight, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const BRAND = '#3c7399';
const BRAND_DARK = '#2b526d';
const BRAND_LIGHT = '#f0f9ff';

export default function CategoryManagement() {
  const dispatch = useDispatch();
  const { category: categoryState } = useSelector((store) => store);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setCategoryName('');
    setParentCategory('');
    setModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setCategoryName(cat.name);
    setParentCategory(
      typeof cat.parentCategory === 'object'
        ? cat.parentCategory?._id || ''
        : cat.parentCategory || ''
    );
    setModalOpen(true);
  };

  const handleSaveCategory = async () => {
    if (!categoryName.trim()) return;
    setLoadingAction(true);
    try {
      if (editingCategory) {
        await dispatch(
          updateCategory(editingCategory._id, {
            name: categoryName.trim(),
            parentCategory: parentCategory || null,
          })
        );
      } else {
        await dispatch(
          createCategory({
            name: categoryName.trim(),
            parentCategory: parentCategory || null,
          })
        );
      }
      setModalOpen(false);
      setCategoryName('');
      setParentCategory('');
    } catch (err) {
      alert(err.message || 'Error saving category');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDeleteCategory = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete category "${name}"?`)) {
      setLoadingAction(true);
      try {
        await dispatch(deleteCategory(id));
      } catch (err) {
        alert(err.message || 'Error deleting category');
      } finally {
        setLoadingAction(false);
      }
    }
  };

  const categories = categoryState?.categories || [];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Box sx={{ mb: 4, pb: 3, borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Admin Panel
              </Typography>
              <ChevronRight size={14} color="#64748b" />
              <Typography variant="caption" sx={{ color: BRAND, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Category Management
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: '-1px' }}>
              JEWELLERY CATEGORIES
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, mt: 0.5 }}>
              Manage website navigation categories dynamically. Changes update the Header menu in real time.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => dispatch(getAllCategories())}
              startIcon={<RefreshCw size={16} />}
              sx={{ borderRadius: '12px', borderColor: '#cbd5e1', color: '#475569', fontWeight: 700 }}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              onClick={handleOpenCreate}
              startIcon={<Plus size={18} />}
              sx={{
                bgcolor: BRAND,
                color: 'white',
                fontWeight: 800,
                borderRadius: '12px',
                px: 3,
                py: 1.2,
                boxShadow: `0 8px 20px ${BRAND}40`,
                '&:hover': { bgcolor: BRAND_DARK }
              }}
            >
              Add New Category
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Categories Table Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <Card sx={{ borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <CardContent sx={{ p: 0 }}>
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '20px' }}>
              <Table>
                <TableHead sx={{ bgcolor: '#f1f5f9' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 800, color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1 }}>Category Name</TableCell>
                    <TableCell sx={{ fontWeight: 800, color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1 }}>Slug</TableCell>
                    <TableCell sx={{ fontWeight: 800, color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1 }}>Hierarchy Level</TableCell>
                    <TableCell sx={{ fontWeight: 800, color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1 }}>Parent Category</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categoryState.loading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                        <CircularProgress sx={{ color: BRAND }} />
                        <Typography variant="body2" sx={{ mt: 2, color: '#64748b' }}>Loading categories...</Typography>
                      </TableCell>
                    </TableRow>
                  ) : categories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                        <Tag size={40} color="#94a3b8" />
                        <Typography variant="body1" sx={{ mt: 1, fontWeight: 700, color: '#475569' }}>No categories found</Typography>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>Click "Add New Category" above to create one.</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    categories.map((cat) => {
                      const parentName = typeof cat.parentCategory === 'object' ? cat.parentCategory?.name : null;
                      return (
                        <TableRow key={cat._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell sx={{ fontWeight: 700, color: '#0f172a' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Box sx={{ width: 8, height: 8, borderRadius: 'full', bgcolor: cat.parentCategory ? '#94a3b8' : BRAND }} />
                              {cat.name}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip label={cat.slug || cat.name.toLowerCase()} size="small" sx={{ bgcolor: BRAND_LIGHT, color: BRAND, fontWeight: 700, borderRadius: '6px' }} />
                          </TableCell>
                          <TableCell>
                            <Chip label={cat.level === 1 ? 'Main Category (Level 1)' : `Sub Category (Level ${cat.level || 2})`} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                          </TableCell>
                          <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>
                            {parentName ? <Chip label={parentName} size="small" sx={{ bgcolor: '#f1f5f9' }} /> : <Typography variant="caption" sx={{ color: '#cbd5e1' }}>None (Top Level)</Typography>}
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title="Edit Category">
                              <IconButton onClick={() => handleOpenEdit(cat)} sx={{ color: BRAND, '&:hover': { bgcolor: BRAND_LIGHT } }}>
                                <Edit2 size={18} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Category">
                              <IconButton onClick={() => handleDeleteCategory(cat._id, cat.name)} sx={{ color: '#ef4444', '&:hover': { bgcolor: '#fef2f2' } }}>
                                <Trash2 size={18} />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Create / Edit Dialog */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '20px', p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 800, color: BRAND, fontSize: '1.2rem' }}>
          {editingCategory ? 'Edit Category' : 'Create New Category'}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: '#64748b', mb: 2.5 }}>
            Category changes saved here will immediately reflect in the database and the Website Header navigation menu.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name *"
            fullWidth
            variant="outlined"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="e.g. Brooch, Waist Belt, Kamardhani"
            sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Parent Category (Optional)</InputLabel>
            <Select
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
              label="Parent Category (Optional)"
              sx={{ borderRadius: '12px' }}
            >
              <MenuItem value="">None (Top-Level Category)</MenuItem>
              {categories
                .filter((c) => !c.parentCategory && (editingCategory ? c._id !== editingCategory._id : true))
                .map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setModalOpen(false)} sx={{ color: '#64748b', fontWeight: 600 }}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveCategory}
            variant="contained"
            disabled={!categoryName.trim() || loadingAction}
            sx={{ bgcolor: BRAND, color: 'white', fontWeight: 800, borderRadius: '10px', px: 3, '&:hover': { bgcolor: BRAND_DARK } }}
          >
            {loadingAction ? <CircularProgress size={20} color="inherit" /> : editingCategory ? 'Update Category' : 'Save Category'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

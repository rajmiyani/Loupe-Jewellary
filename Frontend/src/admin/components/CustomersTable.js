import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  Card,
  CardHeader,
  Divider,
  Box,
  Typography,
  IconButton,
  Tooltip
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, User as UserIcon, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Swal from 'sweetalert2'
import { store } from "../../state/store";
import { deleteUserProfile, getAllUsers } from "../../state/auth/Action";

const CustomersTable = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [auth.deletedUserId]);

  const handleDeleteUserProfile = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This customer profile will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--primary-burgundy)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: 'var(--bg-premium)',
      color: 'var(--text-dark)'
    });

    if (result.isConfirmed) {
      dispatch(deleteUserProfile(userId));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <CardHeader
          title="Customer Base"
          subheader={`Total ${auth.users?.length || 0} registered customers`}
          titleTypographyProps={{ fontWeight: 800 }}
        />
        <Divider />
        <TableContainer>
          <Table sx={{ minWidth: 700 }}>
            <TableHead sx={{ bgcolor: 'var(--bg-premium)' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Index</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Customer Info</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auth.users?.map((user, index) => (
                <TableRow key={user._id} hover>
                  <TableCell sx={{ opacity: 0.6, fontWeight: 600 }}>
                    #{index + 1}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          mr: 2,
                          bgcolor: 'var(--primary-gold)',
                          color: 'var(--primary-burgundy)',
                          fontWeight: 'bold',
                          fontSize: '0.9rem'
                        }}
                      >
                        {user.firstName?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                          {user.firstName} {user.lastName}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', opacity: 0.7 }}>
                          <Mail size={12} style={{ marginRight: '4px' }} />
                          <Typography variant="caption">{user.email}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'var(--primary-burgundy-light)' }}>
                      {user.role || 'CUSTOMER'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Remove User">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteUserProfile(user._id)}
                        disabled={user.role === 'ADMIN'}
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </motion.div>
  );
};

export default CustomersTable;

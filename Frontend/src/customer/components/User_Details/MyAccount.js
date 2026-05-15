import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Divider, Avatar, Button, Grid, TextField } from '@mui/material';
import { Edit3, Mail, MapPin, Phone, Save, X } from 'lucide-react';
import { updateUserProfile } from '../../../state/auth/Action';

const MyAccount = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  const user = auth?.user;
  const address = user?.address?.[0];

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        mobile: user.mobile || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    dispatch(updateUserProfile(user._id, formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      mobile: user.mobile || ''
    });
    setIsEditing(false);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 700, mx: 'auto' }}>
      {/* Profile Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
        <Avatar
          sx={{
            width: 72,
            height: 72,
            bgcolor: '#755970',
            fontSize: '1.8rem',
          }}
        >
          {user?.firstName?.[0]}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ fontSize: '1.4rem', fontWeight: 700, color: '#755970' }}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', color: '#64748b' }}>
            {user?.email}
          </Typography>
        </Box>
        {!isEditing ? (
          <Button
            variant="outlined"
            onClick={() => setIsEditing(true)}
            startIcon={<Edit3 size={16} />}
            sx={{
              borderColor: '#755970',
              color: '#755970',
              fontSize: '0.8rem',
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': { bgcolor: '#755970', color: 'white', borderColor: '#755970' }
            }}
          >
            Edit
          </Button>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              onClick={handleSave}
              startIcon={<Save size={16} />}
              sx={{
                bgcolor: '#755970',
                color: 'white',
                fontSize: '0.8rem',
                textTransform: 'none',
                borderRadius: '8px',
                '&:hover': { bgcolor: '#334155' }
              }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={handleCancel}
              startIcon={<X size={16} />}
              sx={{
                borderColor: '#e2e8f0',
                color: '#64748b',
                fontSize: '0.8rem',
                textTransform: 'none',
                borderRadius: '8px',
                '&:hover': { bgcolor: '#f1f5f9', borderColor: '#cbd5e1' }
              }}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Personal Information */}
      <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5, mb: 2 }}>
        Personal Information
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', mb: 0.5 }}>First Name</Typography>
          {isEditing ? (
            <TextField
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
            />
          ) : (
            <Typography sx={{ fontSize: '1rem', color: '#755970', fontWeight: 600 }}>{user?.firstName || '—'}</Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', mb: 0.5 }}>Last Name</Typography>
          {isEditing ? (
            <TextField
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
            />
          ) : (
            <Typography sx={{ fontSize: '1rem', color: '#755970', fontWeight: 600 }}>{user?.lastName || '—'}</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Mail size={15} color="#755970" />
            <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8' }}>Email</Typography>
          </Box>
          <Typography sx={{ fontSize: '1rem', color: '#755970', fontWeight: 600, mt: 0.5 }}>{user?.email || '—'}</Typography>
          <Typography sx={{ fontSize: '0.7rem', color: '#94a3b8', mt: 0.5 }}>Email cannot be changed</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Phone size={15} color="#755970" />
            <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8' }}>Mobile</Typography>
          </Box>
          {isEditing ? (
            <TextField
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              sx={{ mt: 1 }}
            />
          ) : (
            <Typography sx={{ fontSize: '1rem', color: '#755970', fontWeight: 600, mt: 0.5 }}>{user?.mobile || '—'}</Typography>
          )}
        </Grid>
      </Grid>

      <Divider sx={{ mb: 4 }} />

      {/* Address */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <MapPin size={15} color="#755970" />
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5 }}>
          Primary Address
        </Typography>
      </Box>

      {address ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', mb: 0.5 }}>Street</Typography>
            <Typography sx={{ fontSize: '1rem', color: '#755970', fontWeight: 600 }}>{address.streetAddress || '—'}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', mb: 0.5 }}>City</Typography>
            <Typography sx={{ fontSize: '1rem', color: '#755970', fontWeight: 600 }}>{address.city || '—'}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', mb: 0.5 }}>State</Typography>
            <Typography sx={{ fontSize: '1rem', color: '#755970', fontWeight: 600 }}>{address.state || '—'}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', mb: 0.5 }}>Postal Code</Typography>
            <Typography sx={{ fontSize: '1rem', color: '#755970', fontWeight: 600 }}>{address.zipCode || '—'}</Typography>
          </Grid>
        </Grid>
      ) : (
        <Typography sx={{ fontSize: '0.9rem', color: '#94a3b8' }}>No address on file. Add one during checkout.</Typography>
      )}
    </Box>
  );
};

export default MyAccount;

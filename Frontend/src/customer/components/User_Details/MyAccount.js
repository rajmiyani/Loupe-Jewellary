import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Divider, Avatar, Button, Grid } from '@mui/material';
import { Edit3, Mail, MapPin, Phone } from 'lucide-react';

const MyAccount = () => {
  const { auth } = useSelector(store => store);
  const user = auth?.user;
  const address = user?.address?.[0];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 700, mx: 'auto' }}>
      {/* Profile Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
        <Avatar
          sx={{
            width: 72,
            height: 72,
            bgcolor: '#1e293b',
            fontSize: '1.8rem',
          }}
        >
          {user?.firstName?.[0]}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ fontSize: '1.4rem', fontWeight: 700, color: '#1e293b' }}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', color: '#64748b' }}>
            {user?.email}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<Edit3 size={16} />}
          sx={{
            borderColor: '#97c2d5',
            color: '#1e293b',
            fontSize: '0.8rem',
            textTransform: 'none',
            borderRadius: '8px',
            '&:hover': { bgcolor: '#97c2d5', color: 'white', borderColor: '#97c2d5' }
          }}
        >
          Edit
        </Button>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Personal Information */}
      <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5, mb: 2 }}>
        Personal Information
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', mb: 0.5 }}>First Name</Typography>
          <Typography sx={{ fontSize: '1rem', color: '#1e293b', fontWeight: 600 }}>{user?.firstName || '—'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', mb: 0.5 }}>Last Name</Typography>
          <Typography sx={{ fontSize: '1rem', color: '#1e293b', fontWeight: 600 }}>{user?.lastName || '—'}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Mail size={15} color="#97c2d5" />
            <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8' }}>Email</Typography>
          </Box>
          <Typography sx={{ fontSize: '1rem', color: '#1e293b', fontWeight: 600, mt: 0.5 }}>{user?.email || '—'}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Phone size={15} color="#97c2d5" />
            <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8' }}>Mobile</Typography>
          </Box>
          <Typography sx={{ fontSize: '1rem', color: '#1e293b', fontWeight: 600, mt: 0.5 }}>{user?.mobile || '—'}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 4 }} />

      {/* Address */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <MapPin size={15} color="#97c2d5" />
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5 }}>
          Address
        </Typography>
      </Box>

      {address ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', mb: 0.5 }}>Street</Typography>
            <Typography sx={{ fontSize: '1rem', color: '#1e293b', fontWeight: 600 }}>{address.streetAddress || '—'}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', mb: 0.5 }}>City</Typography>
            <Typography sx={{ fontSize: '1rem', color: '#1e293b', fontWeight: 600 }}>{address.city || '—'}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', mb: 0.5 }}>State</Typography>
            <Typography sx={{ fontSize: '1rem', color: '#1e293b', fontWeight: 600 }}>{address.state || '—'}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', mb: 0.5 }}>Postal Code</Typography>
            <Typography sx={{ fontSize: '1rem', color: '#1e293b', fontWeight: 600 }}>{address.zipCode || '—'}</Typography>
          </Grid>
        </Grid>
      ) : (
        <Typography sx={{ fontSize: '0.9rem', color: '#94a3b8' }}>No address on file.</Typography>
      )}
    </Box>
  );
};

export default MyAccount;

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  styled,
  Alert,
  Collapse,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../state/order/Action';
import { store } from '../../../state/store';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#97c2d5',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#97c2d5',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#9ca3af',
    },
    '&:hover fieldset': {
      borderColor: '#97c2d5',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#97c2d5',
    },
  },
});

const DeliveryAddressForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((s) => s);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    mobile: '',
  });

  const [errors, setErrors] = useState({});
  const [useProfileAddress, setUseProfileAddress] = useState(false);
  const [noProfileAddress, setNoProfileAddress] = useState(false);

  /* ─── helpers ─── */
  const profileAddress = auth.user?.address?.[0];

  const handleProfileCheckbox = (e) => {
    const checked = e.target.checked;
    setUseProfileAddress(checked);

    if (checked) {
      if (profileAddress) {
        // Auto-fill form from the first saved profile address
        setData({
          firstName: profileAddress.firstName || auth.user?.firstName || '',
          lastName: profileAddress.lastName || auth.user?.lastName || '',
          streetAddress: profileAddress.streetAddress || '',
          city: profileAddress.city || '',
          state: profileAddress.state || '',
          zipCode: profileAddress.zipCode || '',
          mobile: profileAddress.mobile || auth.user?.mobile || '',
        });
        setNoProfileAddress(false);
        setErrors({});
      } else {
        // No profile address saved
        setNoProfileAddress(true);
        setUseProfileAddress(false);   // keep checkbox unchecked
      }
    } else {
      setNoProfileAddress(false);
    }
  };

  const validate = () => {
    const errs = {};
    if (!data.firstName?.trim()) errs.firstName = 'First name is required';
    if (!data.lastName?.trim()) errs.lastName = 'Last name is required';
    if (!data.streetAddress?.trim()) errs.streetAddress = 'Address is required';
    if (!data.city?.trim()) errs.city = 'City is required';
    if (!data.state?.trim()) errs.state = 'State is required';
    if (!data.zipCode?.trim()) errs.zipCode = 'Zip code is required';
    const phone = String(data.mobile || '').replace(/\D/g, '');
    if (!phone) errs.mobile = 'Phone number is required';
    else if (phone.length !== 10) errs.mobile = 'Phone number must be 10 digits';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const address = {
      firstName: data.firstName,
      lastName: data.lastName,
      streetAddress: data.streetAddress,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      mobile: data.mobile,
    };
    dispatch(createOrder({ address, navigate }));
  };

  /* ─── render ─── */
  return (
    <div className='my-20'>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={5}>
          <div className='overflow-y-scroll h-[30.5rem] rounded-md shadow-md ' id='deli-add-form'>
            <Grid item>
              <div className="p-3 flex flex-col gap-4 cursor-pointer">
                <h1 className='text-lg font-semibold text-[#97c2d5] uppercase'>Deliver To</h1>
                <hr />
                <div>
                  {auth.user?.address.map((address) => (
                    <div key={address._id} className='p-3 rounded-lg' style={{ border: '1px solid #97c2d5' }}>
                      <div className='space-y-2'>
                        <h1 className='text-lg font-semibold'>{address.firstName} {address.lastName}</h1>
                        <p className='text-sm text-gray-500 font-normal'>{address.streetAddress}, {address.city}, {address.state}, {address.zipCode}</p>
                        <p className='text-sm text-gray-500 font-normal'>Phone : {address.mobile}</p>
                      </div>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setData(address)
                          console.log(address)
                        }}
                        sx={{ my: '1rem', fontSize: '0.75rem', color: '#6a9eb5', borderColor: '#6a9eb5', "&:hover": { bgcolor: "#6a9eb5", color: '#fff', borderColor: '#6a9eb5' }, }}
                        className="flex w-4/12 items-center justify-center rounded-md border-none px-3 py-1"
                      >
                        Use This Address
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

            </Grid>
          </div>
        </Grid >

        <Grid item xs={12} lg={7}>

          <Box className="border rounded-s-md shadow-md p-5">

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>

                <Grid item xs={12} sm={6}>
                  <CssTextField
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    required
                    autoComplete="given-name"
                    value={data.firstName}
                    onChange={(e) => setData({ ...data, firstName: e.target.value })}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CssTextField
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    required
                    autoComplete="family-name"
                    value={data.lastName}
                    onChange={(e) => setData({ ...data, lastName: e.target.value })}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                  />
                </Grid>

                <Grid item xs={12}>
                  <CssTextField
                    id="address"
                    name="address"
                    label="Street Address"
                    fullWidth
                    required
                    multiline
                    rows={3}
                    value={data.streetAddress}
                    onChange={(e) => setData({ ...data, streetAddress: e.target.value })}
                    error={Boolean(errors.streetAddress)}
                    helperText={errors.streetAddress}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <CssTextField
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    required
                    value={data.city}
                    onChange={(e) => setData({ ...data, city: e.target.value })}
                    error={Boolean(errors.city)}
                    helperText={errors.city}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <CssTextField
                    id="state"
                    name="state"
                    label="State / Region"
                    fullWidth
                    required
                    value={data.state}
                    onChange={(e) => setData({ ...data, state: e.target.value })}
                    error={Boolean(errors.state)}
                    helperText={errors.state}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <CssTextField
                    id="zip"
                    name="zip"
                    label="Zip / Postal Code"
                    fullWidth
                    required
                    autoComplete="postal-code"
                    value={data.zipCode}
                    onChange={(e) => setData({ ...data, zipCode: e.target.value })}
                    error={Boolean(errors.zipCode)}
                    helperText={errors.zipCode}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CssTextField
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    required
                    autoComplete="tel"
                    value={data.mobile}
                    onChange={(e) => {
                      const onlyDigits = e.target.value.replace(/\D/g, '');
                      if (onlyDigits.length <= 10) {
                        setData({ ...data, mobile: onlyDigits });
                      }
                    }}
                    error={Boolean(errors.mobile)}
                    helperText={errors.mobile}
                  />
                </Grid>

                <Button
                  // onClick={handleDelivery}
                  variant="contained"
                  type="submit"
                  sx={{ mt: '2rem', ml: '1.5rem', bgcolor: '#6a9eb5', "&:hover": { bgcolor: "#97c2d5" }, }}
                  className="flex w-4/12 uppercase items-center justify-center rounded-md border-none px-8 py-3 text-base font-medium text-white focus:outline-none "
                >
                  Deliver Here
                </Button>

              </Grid>
            </form>
          </Box>
        </div>
        );
};

        export default DeliveryAddressForm;

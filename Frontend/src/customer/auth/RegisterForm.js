import React, { useContext, useEffect, useState } from 'react'
import { Button, Grid, TextField, styled, Box, Typography, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, register, googleLogin } from '../../state/auth/Action';
import { store } from '../../state/store';
import { ModalContext } from '../../context/modal/modalContext';
import Swal from "sweetalert2";
import { GoogleLogin } from '@react-oauth/google';


const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#500724',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#500724',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#9ca3af',
        },
        '&:hover fieldset': {
            borderColor: '#500724',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#500724',
        },
    },
});


const RegisterForm = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [submitBtnDisable, setSubmitBtnDisable] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store)
    const modal = useContext(ModalContext)


    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [jwt, auth.jwt]);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            nameForV(data.firstName) &&
            nameForV(data.lastName) &&
            emailForV(data.email) &&
            passForV(data.password)
        ) {
            setErrMsg("");
            setSubmitBtnDisable(true);

            const userData = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            }

            dispatch(register(userData))
                .then(() => {
                    setSubmitBtnDisable(false);
                    navigate("/")
                    modal.closeModal();

                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Account created successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .catch((err) => {
                    setSubmitBtnDisable(false);

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'An account with this user already exists. Please log in instead.',
                        showConfirmButton: false,
                        timer: 3000
                    });
                    console.log("Error in register user ::: ", err.message);
                });
        }
    }

    const handleGoogleSuccess = (credentialResponse) => {
        console.log("Google Signup Success:", credentialResponse);
        dispatch(googleLogin(credentialResponse.credential))
            .then(() => {
                navigate("/")
                modal.closeModal();
                window.location.reload()
            })
            .catch((err) => {
                console.error("Google Signup Action Error:", err);
            });
    };

    const handleGoogleError = () => {
        console.log("Google Signup Failed");
        Swal.fire({
            icon: "error",
            title: "Google Signup Failed",
            text: "Something went wrong while signing up with Google.",
            showConfirmButton: false,
            timer: 3000,
        });
    };

    const nameForV = (stringName) => {
        if (stringName.length >= 30) {
            setErrMsg("Please enter your name properly");
            return false;
        } else {
            return true;
        }
    };

    const emailForV = (stringEmail) => {
        const validate = new RegExp("^[\\w-_.]*[\\w-_.]@[\\w].+[\\w]+[\\w]$");
        if (!validate.test(stringEmail)) {
            setErrMsg("Please enter your email properly");
            return false;
        } else {
            return true;
        }
    };

    const passForV = (stringPass) => {
        const validate = new RegExp(
            "^(?=.*[0-9])(?=.*[!@#$%^&*_=+-])(?=.*[A-Z])(?=.*[a-z]).{8,12}$"
        );
        if (!validate.test(stringPass)) {
            setErrMsg(
                "Password should contain special character, digits and alphabets, length must be 8 to 12 only."
            );
            return false;
        } else {
            return true;
        }
    };


    return (
        <Box sx={{ display: 'flex', minHeight: '600px' }}>
            {/* Left Side: Image */}
            <Box
                sx={{
                    flex: 1,
                    display: { xs: 'none', md: 'block' },
                    backgroundImage: 'url("/assets/images/auth-bg.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(80, 7, 36, 0.3)',
                    }
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 40,
                        left: 40,
                        color: '#fff',
                        zIndex: 1
                    }}
                >
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Join Loupe Jewellery
                    </Typography>
                    <Typography variant="body1">
                        Create an account to start your luxury journey.
                    </Typography>
                </Box>
            </Box>

            {/* Right Side: Form */}
            <Box
                sx={{
                    flex: 1.2,
                    p: { xs: 4, md: 5 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    bgcolor: '#fff'
                }}
            >
                <Typography variant="h4" fontWeight="bold" mb={1} sx={{ color: '#500724' }}>
                    Sign Up
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                    Join our community of jewellery enthusiasts.
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <CssTextField
                                id='firstName'
                                name='firstName'
                                label='First Name'
                                fullWidth
                                onChange={(e) => setData({ ...data, firstName: e.target.value })}
                                autoComplete='given-name'
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CssTextField
                                id='lastName'
                                name='lastName'
                                label='Last Name'
                                fullWidth
                                onChange={(e) => setData({ ...data, lastName: e.target.value })}
                                autoComplete='family-name'
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CssTextField
                                id='email'
                                name='email'
                                label='Email'
                                fullWidth
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                autoComplete='email'
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CssTextField
                                id='password'
                                name='password'
                                label='Password'
                                type="password"
                                fullWidth
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                autoComplete='new-password'
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption" color="error" sx={{ fontWeight: 'bold' }}>
                                {errMsg}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={submitBtnDisable}
                                fullWidth
                                sx={{
                                    py: 1.5,
                                    bgcolor: '#832729',
                                    '&:hover': { bgcolor: '#500724' },
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                {submitBtnDisable ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                <Box sx={{ my: 3, display: 'flex', alignItems: 'center' }}>
                    <Divider sx={{ flex: 1 }} />
                    <Typography variant="body2" sx={{ mx: 2, color: 'text.secondary' }}>
                        OR
                    </Typography>
                    <Divider sx={{ flex: 1 }} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        theme="outline"
                        size="large"
                        width="100%"
                    />
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        Already have an account?{' '}
                        <Typography
                            component="span"
                            variant="body2"
                            onClick={() => navigate('/login')}
                            sx={{
                                color: '#832729',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            Sign In
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default RegisterForm;

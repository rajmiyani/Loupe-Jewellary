import React, { useContext, useState } from 'react'
import { Button, Grid, TextField, styled, Box, Typography, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, googleLogin, getUser } from '../../state/auth/Action';
import { ModalContext } from '../../context/modal/modalContext';
import Swal from "sweetalert2";
import { GoogleLogin } from '@react-oauth/google';


const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#755970',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#755970',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#9ca3af',
        },
        '&:hover fieldset': {
            borderColor: '#500724',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#755970',
        },
    },
});


const LoginForm = ({ onLoginSuccess }) => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [submitBtnDisable, setSubmitBtnDisable] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const modal = useContext(ModalContext)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (emailForV(data.email) && passForV(data.password)) {
            setErrMsg("");
            setSubmitBtnDisable(true);
            const userData = {
                email: data.email,
                password: data.password,
            };

            dispatch(login(userData))
                .then((user) => {
                    setSubmitBtnDisable(false);
                    modal.closeModal();
                    if (onLoginSuccess) {
                        onLoginSuccess(user);
                    } else if (user?.role === "ADMIN") {
                        window.location.href = "/admin";
                    } else {
                        window.location.href = "/";
                    }
                })
                .catch((err) => {
                    setSubmitBtnDisable(false);

                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Please ensure your email and password are entered correctly.",
                        showConfirmButton: false,
                        timer: 3000,
                    });
                    console.log('Error in login ::: ', err.message);
                })
        }
    };

    const handleGoogleSuccess = (credentialResponse) => {
        console.log("Google Login Success:", credentialResponse);
        dispatch(googleLogin(credentialResponse.credential))
            .then((user) => {
                const jwt = localStorage.getItem("jwt");
                if (jwt) dispatch(getUser(jwt));
                modal.closeModal();
                if (onLoginSuccess) {
                    onLoginSuccess(user);
                } else if (user?.role === "ADMIN") {
                    window.location.href = "/admin";
                } else {
                    window.location.href = "/";
                }
            })
            .catch((err) => {
                console.error("Google Login Action Error:", err);
                Swal.fire({
                    icon: "error",
                    title: "Google Login Failed",
                    text: "Something went wrong. Please try again.",
                    showConfirmButton: false,
                    timer: 3000,
                });
            });
    };

    const handleGoogleError = () => {
        console.log("Google Login Failed");
        Swal.fire({
            icon: "error",
            title: "Google Login Failed",
            text: "Something went wrong while logging in with Google.",
            showConfirmButton: false,
            timer: 3000,
        });
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
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
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
        <Box sx={{ display: 'flex', minHeight: '500px' }}>
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
                        Welcome Back to Loupe
                    </Typography>
                    <Typography variant="body1">
                        Discover timeless elegance and curated collections.
                    </Typography>
                </Box>
            </Box>

            {/* Right Side: Form */}
            <Box
                sx={{
                    flex: 1,
                    p: { xs: 4, md: 6 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    bgcolor: '#fff'
                }}
            >
                <Typography variant="h4" fontWeight="bold" mb={1} sx={{ color: '#755970' }}>
                    Login
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={4}>
                    Please enter your details to sign in.
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CssTextField
                                id='email'
                                name='email'
                                label='Email'
                                fullWidth
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                required
                                autoComplete='email'
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
                                required
                                autoComplete='current-password'
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
                                    bgcolor: '#2c1e2f',
                                    '&:hover': { bgcolor: '#755970' },
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                {submitBtnDisable ? 'Signing in...' : 'Sign In'}
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
                        Don't have an account?{' '}
                        <Typography
                            component="span"
                            variant="body2"
                            onClick={() => navigate('/register')}
                            sx={{
                                color: '#2c1e2f',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            Sign Up
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginForm;

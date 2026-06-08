import React, { useContext, useState, useEffect, useRef } from 'react'
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
    // Rate-limiting state
    const [attemptsLeft, setAttemptsLeft] = useState(null);   // null = no warning yet
    const [lockoutSeconds, setLockoutSeconds] = useState(0);  // >0 = locked out
    const lockoutTimerRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const modal = useContext(ModalContext);

    // Countdown ticker for lockout
    useEffect(() => {
        if (lockoutSeconds > 0) {
            setSubmitBtnDisable(true);
            lockoutTimerRef.current = setInterval(() => {
                setLockoutSeconds((prev) => {
                    if (prev <= 1) {
                        clearInterval(lockoutTimerRef.current);
                        setSubmitBtnDisable(false);
                        setAttemptsLeft(null);
                        setErrMsg("");
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(lockoutTimerRef.current);
    }, [lockoutSeconds]);

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
                    setAttemptsLeft(null);
                    clearInterval(lockoutTimerRef.current);
                    setLockoutSeconds(0);
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
                    console.log('Error in login ::: ', err.message);

                    // Parse the error response from the server (raw Axios error rethrown by Action.js)
                    const responseData = err?.response?.data;
                    const status = err?.response?.status;

                    if (status === 429 || err.message?.includes('429')) {
                        // Locked out — parse seconds from message or use default
                        const seconds = responseData?.retryAfterSeconds || 900;
                        setLockoutSeconds(seconds);
                        const mins = Math.ceil(seconds / 60);
                        Swal.fire({
                            icon: "warning",
                            title: "Account Temporarily Locked 🔒",
                            html: `Too many failed login attempts.<br/>Please try again in <b>${mins} minute(s)</b>.`,
                            showConfirmButton: false,
                            timer: 5000,
                        });
                    } else {
                        // Normal failure — show remaining attempts if available
                        const left = responseData?.attemptsLeft;
                        if (typeof left === 'number' && left >= 0) {
                            setAttemptsLeft(left);
                        }
                        Swal.fire({
                            icon: "error",
                            title: "Login Failed",
                            text: responseData?.message || "Please ensure your email and password are entered correctly.",
                            showConfirmButton: false,
                            timer: 3500,
                        });
                    }
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
            {/* Left Side: Premium Product Image */}
            <Box
                sx={{
                    flex: 1,
                    display: { xs: 'none', md: 'block' },
                    bgcolor: '#755970',
                    backgroundImage: 'url("/assets/images/auth_product_dummy.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 40,
                        left: 40,
                        color: '#fff',
                        zIndex: 1,
                        textShadow: '0 2px 4px rgba(0,0,0,0.4)'
                    }}
                >
                    <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontFamily: "'Playfair Display', serif" }}>
                        Welcome Back to Loupe
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
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

                        {/* Attempts remaining warning */}
                        {attemptsLeft !== null && lockoutSeconds === 0 && (
                            <Grid item xs={12}>
                                <Box sx={{
                                    bgcolor: '#fff8e1',
                                    border: '1px solid #ffe082',
                                    borderRadius: '8px',
                                    px: 2,
                                    py: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}>
                                    <Typography variant="body2" sx={{ color: '#b45309', fontWeight: 600 }}>
                                        ⚠️ {attemptsLeft === 0
                                            ? 'No attempts left. You are now locked out.'
                                            : `Warning: ${attemptsLeft} login attempt(s) remaining before lockout.`}
                                    </Typography>
                                </Box>
                            </Grid>
                        )}

                        {/* Lockout countdown banner */}
                        {lockoutSeconds > 0 && (
                            <Grid item xs={12}>
                                <Box sx={{
                                    bgcolor: '#fef2f2',
                                    border: '1px solid #fca5a5',
                                    borderRadius: '8px',
                                    px: 2,
                                    py: 1.5,
                                    textAlign: 'center'
                                }}>
                                    <Typography variant="body2" sx={{ color: '#dc2626', fontWeight: 700 }}>
                                        🔒 Account Locked
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#7f1d1d' }}>
                                        Too many failed attempts. Try again in{' '}
                                        <b>{Math.floor(lockoutSeconds / 60)}:{String(lockoutSeconds % 60).padStart(2, '0')}</b>
                                    </Typography>
                                </Box>
                            </Grid>
                        )}

                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={submitBtnDisable}
                                fullWidth
                                sx={{
                                    py: 1.5,
                                    bgcolor: lockoutSeconds > 0 ? '#9ca3af' : '#2c1e2f',
                                    '&:hover': { bgcolor: lockoutSeconds > 0 ? '#9ca3af' : '#755970' },
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                {lockoutSeconds > 0
                                    ? `Locked — ${Math.floor(lockoutSeconds / 60)}:${String(lockoutSeconds % 60).padStart(2, '0')}`
                                    : submitBtnDisable ? 'Signing in...' : 'Sign In'}
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

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { useLocation } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '80%', md: 800 },
    bgcolor: 'background.paper',
    borderRadius: '16px',
    outline: "none",
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    p: 0,
};

export default function AuthModel({ open, handleClose }) {
    const location = useLocation();

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="no-scrollbar">
                    {location.pathname === "/login" ? <LoginForm /> : <RegisterForm />}
                </Box>
            </Modal>
        </div>
    );
}

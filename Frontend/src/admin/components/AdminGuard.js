import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getUser } from '../../state/auth/Action';

const AdminGuard = ({ children }) => {
    const { auth } = useSelector(store => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const isFetching = jwt && !auth.user;
    const isAdmin = auth.user?.role === 'ADMIN';

    useEffect(() => {
        if (jwt && !auth.user && !auth.isLoading) {
            dispatch(getUser(jwt));
        }
    }, [jwt, auth.user, auth.isLoading, dispatch]);

    useEffect(() => {
        if (!isFetching && !isAdmin) {
            toast.error(jwt ? "Unauthorized: Admin Access Denied." : "Admin session expired. Please login again.");
        }
    }, [isFetching, isAdmin, jwt]);

    if (isFetching) {
        // Gracefully wait for the application to finish rehydrating the 
        // user profile from the token rather than instantly bouncing them
        return null;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children || <Outlet />;
};

export default AdminGuard;

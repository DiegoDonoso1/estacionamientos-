import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function RequiereAuth() {
    const { isAuthenticated, isLoading } = useAuth0();
    const { loginWithRedirect } = useAuth0();
    if (isAuthenticated) {
        return <Navigate to='/login' />;
    }
    if (isLoading) return <h1>loading..</h1>;
    return loginWithRedirect();
}

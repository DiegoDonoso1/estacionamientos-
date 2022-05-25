import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function RequiereAuth() {
    const { isAuthenticated, isLoading } = useAuth0();
    const { loginWithRedirect } = useAuth0();
    if (!isLoading)
        if (isAuthenticated) {
        } else {
            loginWithRedirect();
        }
}

import React from 'react';
import LoginButton from '../components/LoginButton';
import LogoutBotton from '../components/LogoutBotton';
import Profile from '../components/Profile';
import { useAuth0 } from '@auth0/auth0-react';

export default function Login() {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) return <h1>loading..</h1>;
    return (
        <div>
            <h1>Datos</h1>
            <Profile />
        </div>
    );
}

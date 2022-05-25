import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

export default function LoginButton() {
    const { loginWithRedirect } = useAuth0();
    return (
        <Button
            style={{ backgroundColor: 'rgb(255,66,77)' }}
            onClick={() => loginWithRedirect()}
            variant='danger'
        >
            Iniciar Sesión
        </Button>
    );
}

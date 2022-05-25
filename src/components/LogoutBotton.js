import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

export default function LogoutBotton() {
    const { logout } = useAuth0();
    return (
        <Button
            style={
                ({ backgroundColor: 'rgb(255,66,77)' }, { boxShadow: 'none' })
            }
            className=' rounded-pill '
            onClick={() => logout()}
            variant='danger'
        >
            Cerrar Sesión
        </Button>
    );
}

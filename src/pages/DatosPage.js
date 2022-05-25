import React from 'react';
import FormDatos from '../components/FormDatos';
import { useAuth0 } from '@auth0/auth0-react';

export default function DatosPage() {
    const { isLoading } = useAuth0();
    if (!isLoading)
        return (
            <div className='container'>
                <div className='row'>
                    <div className='row'>
                        <FormDatos />
                    </div>
                </div>
            </div>
        );
}

import React from 'react';
import estacionamientoForm from '../assets/estacionamientoForm.png';
import { useAuth0 } from '@auth0/auth0-react';
import Search from '../components/Search';

export default function Formulario() {
    const { isLoading } = useAuth0();
    if (!isLoading)
        return (
            <div className='container mt-3'>
                <div className='row align-items-center'>
                    <div className='col md-5 '>
                        <Search />
                    </div>
                    <div className='col-md-7 my-auto'>
                        <img
                            className='img-fluid w-100'
                            src={estacionamientoForm}
                            alt=''
                        />
                    </div>
                </div>
            </div>
        );
}

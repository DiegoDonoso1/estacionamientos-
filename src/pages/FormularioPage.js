import React from 'react';
import coupleImg from '../assets/coupleImg.png';
import FormEsta from '../components/Form';
import { useAuth0 } from '@auth0/auth0-react';

export default function Formulario() {
    const { isLoading } = useAuth0();
    if (!isLoading)
        return (
            <div className='container mt-3'>
                <div className='row'>
                    <div className='col md-5'>
                        <FormEsta />
                    </div>
                    <div className='col-md-7 my-auto'>
                        <img
                            className='img-fluid w-100'
                            src={coupleImg}
                            alt=''
                        />
                    </div>
                </div>
            </div>
        );
}

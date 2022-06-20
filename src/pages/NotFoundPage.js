import React from 'react';
import page404 from '../assets/page404.jpg';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function NotFoundPage() {
    const { isLoading } = useAuth0();

    if (!isLoading)
        return (
            <>
                <div className='container' style={{ height: '85vh' }}>
                    <div className='row mb-5' style={{ height: '100%' }}>
                        <div className='col-xl-6 col-lg-6 col-md-6 col-12 align-self-center mb-5'>
                            <h1
                                style={{ fontSize: '145px', fontWeight: '700' }}
                            >
                                ¡Ups!
                            </h1>
                            <h2
                                style={{ fontSize: '32px' }}
                                className='mt-4 mb-4'
                            >
                                No hemos podido encontrar la página que buscas.
                            </h2>
                            <h6>Código de error: 404</h6>
                            <ul className='list-unstyled'>
                                <li>
                                    Aquí tienes algunos enlaces que pueden
                                    ayudarte
                                </li>
                                <li>
                                    <Link
                                        className='text-decoration-none'
                                        to='/'
                                    >
                                        Inicio
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className='text-decoration-none'
                                        to='/mapa'
                                    >
                                        Estacionamientos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className='text-decoration-none'
                                        to='/terminos'
                                    >
                                        Términos y Condiciones
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-6 col-12 align-self-center mb-5'>
                            <img className='img-fluid' src={page404} alt='' />
                        </div>
                    </div>
                </div>
            </>
        );
}

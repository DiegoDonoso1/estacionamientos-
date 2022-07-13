import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <footer className='text-white bg-dark '>
                <div className='container py-3'>
                    {/* <nav className='row'>
                        {' '}
                        <Link
                            to='#'
                            className='col-12 col-md3 d-flex aling-items-center justify-content-center'
                        >
                            {' '}
                        </Link> 
                    </nav> */}
                    <ul className='d-flex justify-content-center list-unstyled'>
                        <li>
                            <Link
                                to='/terminos'
                                className='d-inline-block pe-3 text-decoration-none text-reset '
                            >
                                Términos y Condiciones
                            </Link>
                        </li>
                        
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default Footer;

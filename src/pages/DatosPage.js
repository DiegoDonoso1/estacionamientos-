import React, { useEffect, useState } from 'react';
import FormDatos from '../components/FormDatos';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from '../components/spinner/Spinner';
import { useNavigate } from 'react-router-dom';

export default function DatosPage({ usuario, handleDatos, handleNavbar }) {
    const { isLoading, user } = useAuth0();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const spinner = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    useEffect(() => {
        if (usuario) {
            return navigate('/');
        } else {
            spinner();
        }
    }, [usuario]);

    useEffect(() => {
        handleNavbar(false);
        return () => handleNavbar(true);
    }, [handleNavbar]);

    console.log(usuario);

    if (loading) {
        return <Spinner />;
    }
    return (
        <>
            {usuario == false && user !== undefined && (
                <div className='container'>
                    <div className='row'>
                        <div className='row'>
                            <FormDatos />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

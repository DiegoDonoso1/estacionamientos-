import { React, useState, useEffect } from 'react';
import Profile from '../components/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserExact } from '../api/Estacionamiento';
import { useParams } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import Footer from '../components/Footer';

export default function Login() {
    const { isAuthenticated, isLoading } = useAuth0();
    const [info, setInfo] = useState();
    const { id } = useParams();

    const response = async () => {
        let info = null;
        const data = await getUserExact(id);
        setInfo(data);
    };

    useEffect(() => {
        response();
    }, []);

    if (info == null) return <NotFoundPage />;
    if (!isLoading)
        return (
            <>
                <div className='container-fluid '>
                    <div className='row'>
                        <div className='col-6 mb-5'>
                            <img
                                height='400px'
                                width='400px'
                                className='img-fluid'
                                alt='perfil'
                                src={`http://127.0.0.1:8000/media/${info.imagen}`}
                            />
                        </div>
                        <div className='col-6 mt-5'>
                            <h3> {`${info.nombre} ${info.apellido_P}`} </h3>
                            <br />
                            <h5>{info.correo}</h5>
                        </div>
                    </div>
                </div>

                <Profile />
                <Footer />
            </>
        );
}

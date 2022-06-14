import { React, useState, useEffect } from 'react';
import Profile from '../../components/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserExact } from '../../api/Estacionamiento';
import { useParams } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import Footer from '../../components/Footer';
import './perfil.css';

export default function Login({ promedio }) {
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
                        <div className='col-xl-3 fondo-lateral pb-xl-0 pb-4'>
                            <div className='avatar text-center mt-5'>
                                {info.imagen.length > 0 ? (
                                    <img
                                        height=''
                                        width=''
                                        className='img-perfil'
                                        alt='perfil'
                                        src={`http://127.0.0.1:8000/media/${info.imagen}`}
                                    />
                                ) : (
                                    <img
                                        height=''
                                        width=''
                                        className='img-perfil'
                                        alt='perfil'
                                        src={`https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png`}
                                    />
                                )}
                            </div>
                            <div className='text-center'>
                                <h1> {`${info.nombre} ${info.apellido_P}`} </h1>
                                <h5>{info.correo}</h5>
                            </div>
                        </div>

                        <div
                            className='col-xl-9 '
                            style={{ overflow: 'scroll', height: '100vh' }}
                        >
                            <Profile promedio={promedio} />
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
}

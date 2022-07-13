import { React, useState, useEffect } from 'react';
import Profile from '../../components/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserExact } from '../../api/Estacionamiento';
import { useParams, useNavigate } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import Footer from '../../components/Footer';
import Spinner from '../../components/spinner/Spinner';
import { Button } from 'react-bootstrap';
import './perfil.css';

export default function Login({ promedio }) {
    const { isAuthenticated, isLoading, user } = useAuth0();
    const [info, setInfo] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    const response = async () => {
        const data = await getUserExact(id);
        setInfo(data);
    };

    const handleClick = () => {
        navigate(`/formulario`);
    };

    useEffect(() => {
        response();
    }, [id]);

    if (info == null) return <Spinner />;
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
                                <h6 className='fs-5'>+56 {info.celular}</h6>
                            </div>
                            {isAuthenticated && info.correo == user.email &&(
                                <div className='text-center'>
                                    <Button 
                                        onClick={handleClick}
                                        style={
                                            ({ padding: 'auto' },
                                            { fontSize: '35px' },
                                            { backgroundColor: 'rgb(255,66,77)' },
                                            { boxShadow: 'none' }
                                            )
                                        }
                                    className=' rounded-pill '
                                    size='lg'
                                    variant='danger'>
                                        Publicar Estacionamiento
                                    </Button>
                                </div>
                            )}
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

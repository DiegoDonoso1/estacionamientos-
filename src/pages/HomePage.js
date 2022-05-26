import { Button, Image } from 'react-bootstrap';
import React from 'react';
import Footer from '../components/Footer';
import { Icon } from '@iconify/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/mapa', { replace: false });
    };

    const { loginWithRedirect, isAuthenticated } = useAuth0();

    const handleClickForm = () => {
        navigate('/formulario');
    };




    const { isLoading } = useAuth0();
    if (!isLoading)
        return (
            <>
                <div className=''>
                    <section className='container-fluid bg-dark '>
                        <div className='row align-items-center'>
                            <div className='col-xl-6  col-12'>
                                <h1 className='text-white text-center pt-3'>
                                    Encuentralo!
                                </h1>
                                <p className=' text-white text-center'>
                                    ¿Tienes problemas para encontrar un
                                    estacionamiento? En ApartClick te ayudaremos
                                    a encontrar el estacionamiento que
                                    necesitas, cuando lo necesites
                                </p>

                                <div className='d-flex justify-content-center'>
                                    <Button
                                        style={
                                            ({
                                                backgroundColor:
                                                    'rgb(255,66,77)',
                                            },
                                            { boxShadow: 'none' })
                                        }
                                        className=' rounded-pill '
                                        /* onClick={() => mapa()} */
                                        variant='danger'
                                        onClick={handleClick}
                                    >
                                        Ver estacionamientos
                                    </Button>
                                </div>
                            </div>
                            <div className='col-xl-6 col-12'>
                                <Image
                                    className='m-5 mx-auto d-block img-fluid rounded '
                                    style={{ width: '37rem', height: '25rem' }}
                                    src='https://media.discordapp.net/attachments/711038919419887647/972237940111605810/unknown.png '
                                />
                            </div>
                        </div>
                    </section>

                    <section
                        className='container-fluid'
                        style={{ backgroundColor: '#E5E5E5' }}
                    >
                        <div className='row pt-3 pb-3'>
                            <div
                                className=' text-wrap mx-auto'
                                style={{ width: '30rem' }}
                            >
                                <h2 className='text-center'>
                                    ¿Qué es ApartClick?
                                </h2>
                                <p className='fs-6 fw-light ps-4'>
                                    AparClick es una plataforma online que ha
                                    sido creada para satisfacer la necesidad de
                                    quienes estén buscando un lugar donde
                                    estacionar su auto como también a aquellos
                                    que quieran poner su estacionamiento en
                                    arriendo.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section
                        style={{ backgroundColor: '' }}
                        className='container-fluid'
                    >
                        <div className='row align-items-center '>
                            <div className='col-lg-6 col-12'>
                                <div className='d-flex justify-content-center ps-lg-5 pt-5 text-wrap'>
                                    <div
                                        className='text-wrap'
                                        style={{
                                            backgroundColor: '#f2d7d5',
                                            width: '30rem',
                                            height: '16rem',
                                        }}
                                    >
                                        <h3 className='text-danger ps-4'>
                                            ¿Necesitas estacionarte?
                                        </h3>
                                        <p className='ps-4 text-wrap'>
                                            Si estás en busca de un
                                            estacionamiento, contamos con un
                                            mapa para poder mostrarte los
                                            estacionamientos disponibles que
                                            estén dentro de tu zona, mostrando
                                            en cada uno su información de
                                            precio, dirección y reseña. Para
                                            poder arrendar un estacionamiento
                                            solo debes registrarte y buscar el
                                            estacionamiento que más te acomode
                                            En esta página toda la información
                                            está abierta a nuestros usuarios de
                                            forma gratuita.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-6 col-12 pt-5'>
                                <div className='d-flex justify-content-center pe-lg-5 me-lg-5'>
                                    <div className='row'>
                                        <div className='col'>
                                            <div className='d-flex justify-content-center '>
                                                <Image
                                                    /* className='img-fluid rounded' */
                                                    style={{
                                                        width: '24rem',
                                                        height: '20rem',
                                                        position: 'absolute',
                                                        top: 760,
                                                        right: 200,
                                                        zIndex: -1,
                                                    }}
                                                    src='https://pbs.twimg.com/profile_images/932211484/cuadrado_rojo_400x400.png'
                                                />

                                                <Image
                                                    className='img-fluid rounded'
                                                    style={{
                                                        width: '24rem',
                                                        height: '20rem',
                                                    }}
                                                    src='https://signalsiot.com/wp-content/uploads/2020/01/smart-parking.jpg'
                                                />
                                            </div>
                                        </div>
                                        <div className='col-12 '>
                                            <div className='d-flex justify-content-center'>
                                                <div className='font-weight-light'>
                                                    <h6>
                                                        publicado el 03/21/2022{' '}
                                                    </h6>
                                                </div>
                                                <Icon
                                                    icon={
                                                        'ant-design:star-filled'
                                                    }
                                                    color='#FFFF00'
                                                />
                                                <Icon
                                                    icon={
                                                        'ant-design:star-filled'
                                                    }
                                                    color='#FFFF00'
                                                />
                                                <Icon
                                                    icon={
                                                        'ant-design:star-filled'
                                                    }
                                                    color='#FFFF00'
                                                />
                                                <Icon
                                                    icon={
                                                        'ant-design:star-filled'
                                                    }
                                                    color='#FFFF00'
                                                />
                                                <Icon
                                                    icon={
                                                        'ant-design:star-filled'
                                                    }
                                                    color='#FFFF00'
                                                />
                                            </div>

                                            <div className='col-12'>
                                                <div className='d-flex justify-content-center ps-lg-5 '>
                                                    <p className='' style={{}}>
                                                        Me gusto mucho este
                                                        estacionamiento, buena
                                                        ubicación, baratísimo.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6  col-12 '>
                                <div className='d-flex justify-content-center ps-lg-5  pt-5'>
                                    <div
                                        className='text-wrap '
                                        style={{
                                            backgroundColor: '#f2d7d5 ',
                                            width: '30rem',
                                            height: '16rem',
                                        }}
                                    >
                                        <h3 className='text-danger ps-4 '>
                                            ¿Como arrendar?
                                        </h3>
                                        <p className='ps-4 text-wrap '>
                                            Si tienes un estacionamiento
                                            disponible que no está siendo
                                            aprovechado y quieres ganar dinero
                                            extra, puedes publicarlo en nuestro
                                            sitio web para ser visualizado en el
                                            mapa, solo tienes que registrarte
                                            registrar tu estacionamiento con los
                                            datos importantes para los
                                            interesados y listo, solo debes
                                            esperar a tu futuro arrendatario.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-6 col-12 pt-5'>
                                <div className='d-flex justify-content-center pe-lg-5 me-lg-5'>
                                    <div className='row'>
                                        <div className='col'>
                                            <div className='d-flex justify-content-center '>
                                                <Image
                                                    /* className='img-fluid rounded' */
                                                    style={{
                                                        width: '24rem',
                                                        height: '20rem',
                                                        position: 'absolute',
                                                        top: 1200,
                                                        right: 200,
                                                        zIndex: -1,
                                                    }}
                                                    src='https://pbs.twimg.com/profile_images/932211484/cuadrado_rojo_400x400.png'
                                                />
                                                <Image
                                                    className='img-fluid rounded'
                                                    style={{
                                                        width: '24rem',
                                                        height: '20rem',
                                                    }}
                                                    src='https://signalsiot.com/wp-content/uploads/2020/01/smart-parking.jpg'
                                                />
                                            </div>
                                        </div>
                                        <div className='col-12 pb-lg-5 pb-5 '>
                                            <div className='d-flex justify-content-center ps-lg-5 font-weight-normal '>
                                                <h6>publicado el 05/05/2022</h6>
                                                <Icon
                                                    icon={
                                                        'ant-design:star-filled'
                                                    }
                                                    color='#FFFF00'
                                                />
                                                <Icon
                                                    icon={
                                                        'ant-design:star-filled'
                                                    }
                                                    color='#FFFF00'
                                                />
                                                <Icon
                                                    icon={
                                                        'ant-design:star-filled'
                                                    }
                                                    color='#FFFF00'
                                                />
                                                <Icon
                                                    icon={
                                                        'ant-design:star-filled'
                                                    }
                                                    color='#FFFF00'
                                                />
                                                <Icon
                                                    icon={
                                                        'ant-design:star-filled'
                                                    }
                                                    color='#FFFF00'
                                                />
                                            </div>

                                            <div className='col-12'>
                                                <div className='d-flex justify-content-center ps-lg-5 '>
                                                    <p className='' style={{}}>
                                                        ¡Exelente
                                                        estacionamiento, buena
                                                        ubicación y precio
                                                        razonable!.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        className='container-fluid'
                        style={{ backgroundColor: '#E5E5E5' }}
                    >
                        <div className='row pt-3 pb-3'>
                            <div
                                className='col-12 text-wrap mx-auto'
                                style={{ width: '25rem' }}
                            >
                                <h4 className='text-center'>
                                    ¿Quieres aprovechar tu estacionamiento?
                                </h4>

                                {!isAuthenticated ?(
                                    <div className='col-12 text-center'>
                                        <Button
                                            className='bg-dark border-dark'
                                            onClick={loginWithRedirect}>
                                            Ingresa
                                        </Button>
                                    </div>
                                ):(
                                    <div className='container mt-3 text-center'>
                                        <Button
                                            onClick={handleClickForm}
                                            className='rounded-pill'
                                            variant='danger'
                                            style={{
                                                backgroundColor:'rgb(255,66,77)',
                                                boxShadow: 'none'
                                                    }}
                                        >Publicar Estacionamiento</Button>
                                    </div>)}
                            </div>
                        </div>
                    </section>

                    <div>
                        <Footer />
                    </div>
                </div>
            </>
        );
}

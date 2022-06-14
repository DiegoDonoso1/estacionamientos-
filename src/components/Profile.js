import { React, useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import getEstacionamiento from '../api/Estacionamiento';
import { useParams, Link } from 'react-router-dom';
import noEstacionamiento from '../assets/noEstacionamiento.png';
import estacionamientosvg from '../assets/estacionamiento.svg';
import { height } from '@mui/system';

export default function Profile({ promedio }) {
    const [estacionamiento, setEstacionamiento] = useState([]);
    const { id } = useParams();
    const [imagen, setImagenes] = useState([]);

    const getData = async () => {
        const data = await getEstacionamiento();
        const estacionamientos = data.estacionamientos;
        const imagenes = data.imagenes;
        const imagen = [];
        const array = [];
        estacionamientos.map((res, i) => {
            // eslint-disable-next-line eqeqeq
            if (res.user_id == id) {
                array.push(res);
                imagenes.map((item) => {
                    if (item.producto_id == res.id) {
                        imagen.push(item);
                    }
                });
            }
        });

        const result = imagen.reduce((acc, item, i) => {
            if (!acc.find((d) => d.producto_id == item.producto_id)) {
                acc.push(item);
            }
            return acc;
        }, []);

        setImagenes(result);
        setEstacionamiento(array);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Container fluid='mdz'>
                <Row xs={1} className='mt-3'>
                    <Col xl={6} md={12} className='col align-self-end'>
                        <div className='text-end-xl text-center'>
                            <h3 className=''>Mis estacionamientos</h3>
                        </div>
                    </Col>
                    <Col xl={6} md={12} className='mb-xl-0 mb-4'>
                        <div className='text-center'>
                            <img
                                className='img-fluid'
                                style={{ height: '100px' }}
                                src={estacionamientosvg}
                                alt=''
                            />
                        </div>
                    </Col>
                </Row>

                {estacionamiento.length > 0 ? (
                    <Row xs={1} md={2} sm={2} xl={3} lg={3} className='row '>
                        {estacionamiento.map((esta, i) => (
                            <Link
                                className=''
                                style={{
                                    color: '#000',
                                    textDecoration: 'none',
                                }}
                                to={`/estacionamientos/${esta.id}`}
                            >
                                <Col
                                    xl={4}
                                    lg={4}
                                    sm={6}
                                    md={6}
                                    xs={12}
                                    className='mt-xl-5 mb-xl-5 col align-self-center'
                                >
                                    <Card
                                        className='border-0 m-xl-2 m-4 '
                                        style={{
                                            width: '18rem',
                                        }}
                                    >
                                        {imagen[i].producto_id === esta.id && (
                                            <Card.Img
                                                className='rounded-3'
                                                variant='top'
                                                src={`http://127.0.0.1:8000/media/${imagen[i].imagen}`}
                                            />
                                        )}
                                        <Card.Body className='p-0'>
                                            <Card.Title className='fs-5 fw-normal mt-1 mb-1'>
                                                {esta.tittle}
                                            </Card.Title>
                                            <Card.Text className='text-muted mb-1 lh-1'>
                                                {esta.desc}
                                            </Card.Text>
                                            <Card.Text className='fw-normal '>
                                                $
                                                {new Intl.NumberFormat(
                                                    'de-DE'
                                                ).format(esta.precio) + ' '}
                                                CLP
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Link>
                        ))}
                    </Row>
                ) : (
                    <div className='container-fluid-sm mt-5'>
                        <div className='row align-items-center'>
                            <div className='col-xl-6 col-12 ps-xl-0 pe-xl-0'>
                                <div className='text-center '>
                                    <h5 className='fs-2 fw-normal'>
                                        Este usuario aún no tiene
                                        estacionamientos publicados
                                    </h5>
                                </div>
                            </div>
                            <div className='col-xl-6 col-12 ps-xl-0 pe-xl-0'>
                                <div className='text-center text-start'>
                                    <img
                                        className='img-fluid'
                                        height='500px'
                                        width='500px'
                                        src={noEstacionamiento}
                                        alt=''
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </>
    );
}

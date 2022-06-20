import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Row, Col, Container, Card } from 'react-bootstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './ListaEstacionamientos.css';

export default function ListaEstacionamientos() {
    const navigate = useNavigate();
    const [imagenes, setImagenes] = useState([]);
    const [pins, setPins] = useState([]);

    let location = useLocation();

    useEffect(() => {
        const getPins = async () => {
            try {
                const imagen = [];
                const res = await axios.get(
                    'http://127.0.0.1:8000/api/estacionamiento/'
                );
                const imagenes = res.data.imagenes;
                const estacionamientos = res.data.estacionamientos;
                estacionamientos.map((resp, i) => {
                    imagenes.map((item) => {
                        if (item.producto_id == resp.id) {
                            imagen.push(item);
                        }
                    });
                });
                const result = imagen.reduce((acc, item, i) => {
                    if (!acc.find((d) => d.producto_id == item.producto_id)) {
                        acc.push(item);
                    }
                    return acc;
                }, []);
                setImagenes(result);
                setPins(res.data.estacionamientos);
            } catch (err) {
                console.log(err);
            }
        };
        getPins();
    }, []);

    const handleClick = () => {
        navigate('/mapa', { state: false });
    };

    const handleClickForm = () => {
        navigate('/formulario');
    };

    return (
        <>
            {/* {pins.map((p, i) => (
                        <div className='col-4'>
                            {imagenes[i].producto_id === p.id && (
                                <img
                                    src={`http://127.0.0.1:8000/media/${imagenes[i].imagen}`}
                                    height='300px'
                                    alt='img_estacionamiento'
                                />
                            )}
                            <h3>{p.tittle}</h3>
                            <h5>{p.username}</h5>
                            <p>{p.desc}</p>
                            <p>{p.rating}</p>
                            <hr />
                        </div>
                    ))} */}
            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-6'>
                        <Button
                            onClick={handleClickForm}
                            className='rounded-pill'
                            variant='outline-dark'
                            style={{}}
                        >
                            Publicar Estacionamiento
                        </Button>
                    </div>

                    <div className='col-6 text-end'>
                        <Button
                            className='rounded-pill'
                            onClick={handleClick}
                            variant='danger'
                            style={{
                                backgroundColor: 'rgb(255,66,77)',
                                boxShadow: 'none',
                            }}
                        >
                            Mostrar mapa
                        </Button>
                    </div>
                </div>
            </div>
            <Container fluid='lg' classname='mt-5'>
                <Row
                    xs={1}
                    md={2}
                    sm={2}
                    xl={3}
                    lg={3}
                    xxl={4}
                    className='mt-5'
                >
                    {pins.map((p, idx) => (
                        <Col>
                            <Link
                                style={{
                                    color: '#000',
                                    textDecoration: 'none',
                                }}
                                className='text-decoration-none'
                                to={`/estacionamientos/${p.id}`}
                            >
                                <Col
                                    xl={4}
                                    lg={4}
                                    sm={6}
                                    md={6}
                                    xs={12}
                                    className='col align-self-center'
                                >
                                    <Card
                                        className='border-0 m-xl-2 m-4 card-list'
                                        style={{
                                            width: '18rem',
                                        }}
                                    >
                                        <Card.Img
                                            className='rounded-3'
                                            variant='top'
                                            src={`http://127.0.0.1:8000/media/${imagenes[idx].imagen}`}
                                        />

                                        <Card.Body className='p-0'>
                                            <Card.Title className='fs-5 fw-normal mt-1 mb-1'>
                                                {p.tittle}
                                            </Card.Title>
                                            <Card.Text className='text-muted mb-1 lh-1'>
                                                {p.direccion}
                                            </Card.Text>
                                            <Card.Text className='fw-normal '>
                                                $
                                                {new Intl.NumberFormat(
                                                    'de-DE'
                                                ).format(p.precio) + ' '}
                                                CLP
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                {/*  <div className='container'>
                                    <div className='card  '>
                                        <img
                                            className='card-img-top rounded-3'
                                            src={`http://127.0.0.1:8000/media/${imagenes[idx].imagen}`}
                                            alt=''
                                        />
                                        <div className='card-body ps-0 text-muted'>
                                            <div className='mb-0 pb-0'>
                                                <h5 className='fw-bolder mb-0 pb-0 fs-6'>
                                                    {p.direccion}
                                                </h5>
                                            </div>

                                            <div>
                                                <span className='text-muted '>
                                                    {p.tittle}
                                                </span>
                                            </div>
                                            <div className='mt-0 fw-bold'>
                                                <span>${p.precio}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

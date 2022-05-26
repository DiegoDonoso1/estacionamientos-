import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Row, Col, Container } from 'react-bootstrap';
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
                const res = await axios.get(
                    'http://127.0.0.1:8000/api/estacionamiento/'
                );
                setImagenes(res.data.imagenes);
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
                        <Button
                            onClick={handleClickForm}
                            className='rounded-pill'
                            variant='danger'
                            style={{
                                backgroundColor:'rgb(255,66,77)',
                                boxShadow: 'none'
                                    }}
                        >Publicar Estacionamiento</Button>
                    </div>
            <Container classname='mt-5'>
                <Row xs={1} md={4} className='mt-5'>
                    {pins.map((p, idx) => (
                        <Col>
                            <Link
                                className='text-decoration-none'
                                to={`/estacionamientos/${p.id}`}>
                                <div className='container'>
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
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>

            <div>
                <Button
                    onClick={handleClick}
                    variant='danger'
                    style={{
                        position: 'absolute',
                        top: '85%',
                        left: '50%',
                        zIndex: 1,
                        backgroundColor:'rgb(255,66,77)',
                        boxShadow: 'none'
                    }}
                >
                    Mostrar mapa
                </Button>
            </div>
        </>
    );
}

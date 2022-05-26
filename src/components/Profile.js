import { React, useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import getEstacionamiento from '../api/Estacionamiento';
import { useParams, Link } from 'react-router-dom';
import  noEstacionamiento  from '../assets/noEstacionamiento.png'

export default function Profile() {
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
                imagen.push(imagenes[i]);
            }
        });
        setImagenes(imagen);
        setEstacionamiento(array);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Container>
                <div className='text-center'>
                    {' '}
                    <h2>Estacionamientos</h2>
                </div>

                <Row>
                    {estacionamiento.length > 0 ? (
                        estacionamiento.map((esta, i) => (
                            <Link
                                className='text-decoration-none text-muted'
                                to={`/estacionamientos/${esta.id}`}>
                                    <Col className='mt-5 mb-5'>
                                        <Card style={{ width: '18rem' }}>
                                            {imagen[i].producto_id === esta.id && (
                                                <Card.Img
                                                    variant='top'
                                                    src={`http://127.0.0.1:8000/media/${imagen[i].imagen}`}
                                                />
                                            )}
                                            <Card.Body>
                                                <Card.Title>{esta.tittle}</Card.Title>
                                                <Card.Text>{esta.desc}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                            </Link>
                        ))
                    ) : (
                        <div className='container mt-5'>
                            <div className='text-center'>
                                <h5>Este usuario aún no tiene estacionamientos publicados</h5>
                                <img
                                    height='500px'
                                    width='500px'
                                    src={noEstacionamiento} alt=''/>
                            </div>
                        </div>
                    )}
                </Row>
            </Container>
        </>
    );
}

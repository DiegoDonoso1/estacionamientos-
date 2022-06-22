/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import StarIcon from '@mui/icons-material/Star';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './mapa.css';
import { useNavigate, Outlet, useLocation, Link } from 'react-router-dom';
import { Button, Row, Col, Container, Card } from 'react-bootstrap';
import { Icon } from '@iconify/react';

import 'mapbox-gl/dist/mapbox-gl.css';

export default function Mapa() {
    const navigate = useNavigate();
    let location = useLocation();

    const MAPBOX_TOKEN =
        'pk.eyJ1IjoiaWhvbHMiLCJhIjoiY2wxaDBqN20xMGhpcDNrcGJjbnYwMGJqdCJ9.3BrY2IMad1HP4mPFI0jAEw';
    const { isLoading } = useAuth0();
    const [pins, setPins] = useState([]);
    const [currentPlaceId, SetCurrentPlaceId] = useState(null);
    const [imagenes, setImagenes] = useState([]);

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
        navigate('listado', { state: true });
    };

    //Obtener Lat,Lng por ubicacion actual desde el navegador
    /* useEffect(() => {
        const position = async () => {
            try {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    setLng(position.coords.longitude);
                    setLat(position.coords.latitude);
                });
            } catch (err) {
                console.log(err);
            }
        };
        position();
    }, []); */

    const handleMarkerClick = (id) => {
        SetCurrentPlaceId(id);
    };

    if (!isLoading)
        return (
            <>
                {location.state ? (
                    <Outlet />
                ) : (
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-12'>
                                <Map
                                    initialViewState={{
                                        latitude: -33.45694,
                                        longitude: -70.64827,
                                        zoom: 10,
                                    }}
                                    style={{ width: '100%', height: '100vh' }}
                                    mapStyle='mapbox://styles/mapbox/streets-v9'
                                    mapboxAccessToken={MAPBOX_TOKEN}
                                >
                                    <NavigationControl />

                                    {pins !== undefined &&
                                        pins.map((p, index) => (
                                            <>
                                                <Marker
                                                    longitude={p.long}
                                                    latitude={p.lat}
                                                    anchor='bottom'
                                                >
                                                    <DirectionsCarIcon
                                                        key={index}
                                                        sx={{
                                                            color: '#FF424D',
                                                        }}
                                                        style={{ fontSize: 30 }}
                                                        onClick={() =>
                                                            handleMarkerClick(
                                                                p.id
                                                            )
                                                        }
                                                    />
                                                </Marker>

                                                {p.id === currentPlaceId && (
                                                    <Popup
                                                        key={p.id}
                                                        longitude={p.long}
                                                        latitude={p.lat}
                                                        anchor='left'
                                                        closeButton={true}
                                                        closeOnClick={false}
                                                        onClose={() =>
                                                            SetCurrentPlaceId(
                                                                null
                                                            )
                                                        }
                                                    >
                                                        {/* <div className='card'>
                                                            <label>Lugar</label>
                                                            <h4 className='parking'>
                                                                {p.tittle}
                                                            </h4>
                                                            <label>
                                                                Review
                                                            </label>
                                                            <p className='desc'>
                                                                {p.desc}
                                                            </p>
                                                            <label>
                                                                Rating
                                                            </label>
                                                            <div className='stars'>
                                                                <StarIcon className='star' />
                                                                <StarIcon className='star' />
                                                                <StarIcon className='star' />
                                                                <StarIcon className='star' />
                                                                <StarIcon className='star' />
                                                            </div>
                                                            <label>
                                                                Información
                                                            </label>
                                                            <span className='username'>
                                                                Su dueño es{' '}
                                                                <b>
                                                                    {p.username}
                                                                </b>
                                                            </span>
                                                        </div> */}
                                                        <Link
                                                            style={{
                                                                color: '#000',
                                                                textDecoration:
                                                                    'none',
                                                            }}
                                                            className='text-decoration-none'
                                                            to={`/estacionamientos/${p.id}`}
                                                        >
                                                            <Card
                                                                className='border-0 card-pop'
                                                                style={{
                                                                    width: '18rem',
                                                                }}
                                                            >
                                                                <Card.Img
                                                                    className='rounded-3 card-img-pop'
                                                                    variant='top'
                                                                    src={`http://127.0.0.1:8000/media/${imagenes[index].imagen}`}
                                                                />
                                                                <Card.Body className='p-0'>
                                                                    <Card.Title className='fs-5 fw-normal mt-1 mb-1'>
                                                                        {
                                                                            p.tittle
                                                                        }
                                                                    </Card.Title>
                                                                    <Card.Text className='text-muted mb-1 lh-1'>
                                                                        {
                                                                            p.direccion
                                                                        }
                                                                    </Card.Text>
                                                                    <Card.Text className='fw-normal d-flex justify-content-between'>
                                                                        <span>
                                                                            $
                                                                            {new Intl.NumberFormat(
                                                                                'de-DE'
                                                                            ).format(
                                                                                p.precio
                                                                            ) +
                                                                                ' '}
                                                                            CLP
                                                                        </span>
                                                                        <span>
                                                                            {
                                                                                p.promedio
                                                                            }{' '}
                                                                            <Icon
                                                                                icon='ant-design:star-filled'
                                                                                width='15'
                                                                                height='15'
                                                                            />
                                                                        </span>
                                                                    </Card.Text>
                                                                </Card.Body>
                                                            </Card>
                                                        </Link>
                                                    </Popup>
                                                )}
                                            </>
                                        ))}
                                    <div>
                                        <Button
                                            className='rounded-pill'
                                            variant='danger'
                                            onClick={handleClick}
                                            style={{
                                                position: 'absolute',
                                                top: '85%',
                                                left: '45%',
                                                /* right: '50%', */
                                                zIndex: 1,
                                                backgroundColor:
                                                    'rgb(255,66,77)',
                                                boxShadow: 'none',
                                            }}
                                        >
                                            Mostrar Lista
                                        </Button>
                                    </div>
                                </Map>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
}

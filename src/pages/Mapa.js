/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import StarIcon from '@mui/icons-material/Star';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './mapa.css';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from 'react-bootstrap';

export default function Mapa() {
    const navigate = useNavigate();
    let location = useLocation();
    console.log(location);

    const MAPBOX_TOKEN =
        'pk.eyJ1IjoiaWhvbHMiLCJhIjoiY2wxaDBqN20xMGhpcDNrcGJjbnYwMGJqdCJ9.3BrY2IMad1HP4mPFI0jAEw';
    const { id } = useParams();
    const { isLoading } = useAuth0();
    const [pins, setPins] = useState([]);
    const [currentPlaceId, SetCurrentPlaceId] = useState(null);

    useEffect(() => {
        const getPins = async () => {
            try {
                const res = await axios.get(
                    'http://127.0.0.1:8000/api/estacionamiento/'
                );
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

                                    {pins.map((p, index) => (
                                        <>
                                            <Marker
                                                longitude={p.long}
                                                latitude={p.lat}
                                                anchor='bottom'
                                            >
                                                <DirectionsCarIcon
                                                    key={index}
                                                    sx={{ color: '#FF424D' }}
                                                    style={{ fontSize: 30 }}
                                                    onClick={() =>
                                                        handleMarkerClick(p.id)
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
                                                        SetCurrentPlaceId(null)
                                                    }
                                                >
                                                    <div className='card'>
                                                        <label>Lugar</label>
                                                        <h4 className='parking'>
                                                            {p.tittle}
                                                        </h4>
                                                        <label>Review</label>
                                                        <p className='desc'>
                                                            {p.desc}
                                                        </p>
                                                        <label>Rating</label>
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
                                                            <b>{p.username}</b>
                                                        </span>
                                                        <span className='date'>
                                                            Hace <b>10s</b>
                                                        </span>
                                                    </div>
                                                </Popup>
                                            )}
                                        </>
                                    ))}
                                    <div>
                                        <Button
                                            onClick={handleClick}
                                            style={{
                                                position: 'absolute',
                                                top: '85%',
                                                left: '50%',
                                                zIndex: 1,
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

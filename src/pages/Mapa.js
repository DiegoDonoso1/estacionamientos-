import { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import './mapa.css';

import 'mapbox-gl/dist/mapbox-gl.css';

export default function Mapa() {
    const MAPBOX_TOKEN =
        'pk.eyJ1IjoiaWhvbHMiLCJhIjoiY2wxaDBqN20xMGhpcDNrcGJjbnYwMGJqdCJ9.3BrY2IMad1HP4mPFI0jAEw';
    const [pins, setPins] = useState([]);
    const [currentPlaceId, SetCurrentPlaceId] = useState(null);

    useEffect(() => {
        const getPins = async () => {
            try {
                const res = await axios.get('estacionamiento/');
                setPins(res.data.estacionamientos);
            } catch (err) {
                console.log(err);
            }
        };
        getPins();
    }, []);

    const handleMarkerClick = (id) => {
        SetCurrentPlaceId(id);
    };

    return (
        <>
            <div></div>
            <Map
                initialViewState={{
                    latitude: 46,
                    longitude: 17,
                    zoom: 4,
                }}
                style={{ width: '100vw', height: '100vh' }}
                mapStyle='mapbox://styles/mapbox/streets-v9'
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                {pins.map((p) => (
                    <>
                        <Marker
                            longitude={p.long}
                            latitude={p.lat}
                            anchor='bottom'
                        >
                            <DirectionsCarIcon
                                sx={{ color: '#FF424D' }}
                                style={{ fontSize: 30 }}
                                onClick={() => handleMarkerClick(p.id)}
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
                                onClose={() => SetCurrentPlaceId(null)}
                            >
                                <div className='card'>
                                    <label>Lugar</label>
                                    <h4 className='parking'>{p.tittle}</h4>
                                    <label>Review</label>
                                    <p className='desc'>{p.desc}</p>
                                    <label>Rating</label>
                                    <div className='stars'>
                                        <StarIcon className='star' />
                                        <StarIcon className='star' />
                                        <StarIcon className='star' />
                                        <StarIcon className='star' />
                                        <StarIcon className='star' />
                                    </div>
                                    <label>Información</label>
                                    <span className='username'>
                                        Su dueño es <b>{p.username}</b>
                                    </span>
                                    <span className='date'>
                                        Hace <b>10s</b>
                                    </span>
                                </div>
                            </Popup>
                        )}
                    </>
                ))}
                {console.log(currentPlaceId)}
            </Map>
        </>
    );
}

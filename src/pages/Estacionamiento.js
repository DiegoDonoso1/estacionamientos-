import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Review from '../components/Review';
import { useAuth0 } from '@auth0/auth0-react';

export default function Estacionamiento() {
    const { isLoading } = useAuth0();
    const { id } = useParams();
    const [estacionamiento, setEstacionamiento] = useState([]);

    useEffect(() => {
        response();
    }, []);

    const response = async () => {
        const data = await fetch(
            `http://127.0.0.1:8000/api/estacionamiento/${id}`
        );
        const res = await data.json();
        setEstacionamiento(res.estacionamientos);
    };
    if (!isLoading)
        return (
            <>
                <div>
                    Dueño estacionamiento: {estacionamiento.username}
                    Nombre: {estacionamiento.tittle}
                </div>
                <Review />
            </>
        );
}

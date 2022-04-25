import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Estacionamiento() {
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
    return (
        <div>
            Dueño estacionamiento: {estacionamiento.username}
            Nombre: {estacionamiento.tittle}
        </div>
    );
}

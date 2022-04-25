import { React, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function Profile() {
    const { user, isAuthenticated } = useAuth0();
    const [estacionamiento, setEstacionamiento] = useState([]);

    useEffect(() => {
        response();
    }, []);

    const response = async () => {
        const data = await fetch(`http://127.0.0.1:8000/api/estacionamiento/`);
        const res = await data.json();
        setEstacionamiento(res.estacionamientos);
    };

    return (
        isAuthenticated && (
            <>
                <div>
                    <img src={user.picture} alt={user.name} />
                    <h2>{user.email}</h2>
                </div>
                <div>
                    <h2>Mis estacionamientos</h2>
                    <ul>
                        {estacionamiento.map(
                            (item) =>
                                user.name === item.username && (
                                    <li>
                                        {item.tittle}-{item.desc}
                                    </li>
                                )
                        )}
                    </ul>
                </div>
            </>
        )
    );
}

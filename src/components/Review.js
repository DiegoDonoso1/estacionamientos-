import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useParams, Link } from 'react-router-dom';
import FormReview from './FormReview';

export default function Review() {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const getReviews = async () => {
            const { data } = await axios.get(
                `http://127.0.0.1:8000/review/review/`
            );
            setReviews(data.reviews);
        };
        getReviews();
    }, []);

    return (
        <div>
            <h1>Comentarios</h1>
            {reviews.map(
                (item) =>
                    // eslint-disable-next-line eqeqeq
                    id == item.parking_id && (
                        <li key={item.id}>
                            {item.description} Calificación:{item.rating}
                        </li>
                    )
            )}
            <Link to='addReview'>
                <button>Agrega Comentario</button>
            </Link>
            <Link to=''>
                <button>Cerrar </button>
            </Link>

            <Routes>
                <Route path='addReview' element={<FormReview />} />
            </Routes>
        </div>
    );
}

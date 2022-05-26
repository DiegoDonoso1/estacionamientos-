import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useParams, Link } from 'react-router-dom';
import FormReview from './FormReview';
import StarRating from './StarRating/StarRating';
import { Icon } from '@iconify/react';

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
        <div className='container'>
            <div className='row'>
                <div className='col-12 pb-4 ps-5 '>
                    {reviews !== undefined &&
                        reviews.map(
                            (item, i) =>
                                // eslint-disable-next-line eqeqeq
                                id == item.parking_id && (
                                    <>
                                        <h4 className='fw-bolder'>
                                            {item.user}
                                        </h4>
                                        <h6
                                            style={{
                                                color: 'rgb(255,66,77)',
                                            }}
                                        >
                                            {item.fecha_creacion.substring(
                                                0,
                                                10
                                            )}
                                        </h6>
                                        <div className=''>
                                            {[...Array(5)].map((star, i) => {
                                                const ratingValue = i + 1;
                                                return (
                                                    <Icon
                                                        key={i}
                                                        icon='ant-design:star-filled'
                                                        color={
                                                            ratingValue <= item.rating
                                                                ? '#FF424D'
                                                                : '#e4e5e9'
                                                        }
                                                        width='31'
                                                        height='30'
                                                    />
                                                );
                                            })}
                                        </div>
                                        <p className='fw-normal pt-1 pb-4'>
                                            {item.description}
                                        </p>
                                        <hr></hr>
                                    </>
                                )
                        )}
                </div>
            </div>

            {/* <Link to=''>
                <button>Cerrar </button>
            </Link> */}

            {/* <StarRating /> */}

            <Routes>
                <Route path='addReview' element={<FormReview />} />
            </Routes>
        </div>
    );
}

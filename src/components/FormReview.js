import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from './TextField';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import StarRating from './StarRating/StarRating';
import { Button } from 'react-bootstrap';

import { Icon } from '@iconify/react';

export default function FormReview({ reviews, reviewChange }) {
    const [rating, setRating] = useState(null);
    const { user, isAuthenticated, isLoading } = useAuth0();
    let navigate = useNavigate();
    const { id } = useParams();

    const handleRating = (newRating) => {
        setRating(newRating);
    };

    /*  const handleFalse = () => {
        navigate(' ');
    }; */

    const validate = Yup.object({
        username: Yup.string()
            .max(25, 'Must be 15 characters or less')
            .required('Required'),
        description: Yup.string()
            .max(200, 'maximo 200 caracteres')
            .required('desc is required'),
        rating: Yup.number()
            .max(5, 'rating must bea 5 stars')
            .required('rating is required'),
    });
    return (
        <Formik
            initialValues={{
                username: `${user.name}`,
                rating: ``,
                description: '',
                parking_id: parseInt(id),
            }}
            /* validationSchema={validate} */
            onSubmit={async (values) => {
                let data = new FormData();
                data.append('username', values.username);
                data.append('rating', rating);
                data.append('description', values.description);
                data.append('parking_id', values.parking_id);
                await axios
                    .post('http://127.0.0.1:8000/review/review/', data)
                    .then((response) => {
                        if (response.data.message == 'success') {
                            axios
                                .get(`http://127.0.0.1:8000/review/review/`)
                                .then((res) => {
                                    const resulta = res.data.reviews
                                        .reverse()
                                        .reduce((ac, item) => {
                                            if (
                                                !ac.find(
                                                    (d) => d.user == item.user
                                                )
                                            ) {
                                                ac.push(item);
                                            }
                                            return ac;
                                        }, []);
                                    reviewChange(resulta);
                                });
                        }
                    });
            }}
        >
            {(formik) => (
                <div className='container mb-5 '>
                    <div className='row'>
                        <div className='text-end'>
                            <Link to='..'>
                                <Icon
                                    icon='ci:close-small'
                                    color='#ff424d'
                                    width='30'
                                    height='30'
                                    hFlip={true}
                                    vFlip={true}
                                />
                            </Link>
                        </div>
                        <div className='col-12 ps-5 '>
                            <h3 className='my-4 font-weight-bold .display-4'>
                                Ingresar Comentario
                            </h3>
                        </div>

                        <Form className='row'>
                            <div className='col-12 ps-5'>
                                <TextField
                                    label='Descripción'
                                    name='description'
                                    type='text'
                                />
                            </div>
                            <div className='ps-5'>
                                <StarRating
                                    rating={rating}
                                    ratingChange={handleRating}
                                />
                            </div>
                            <div className='ps-5'>
                                <Button
                                    className='btn btn-dark mt-3'
                                    type='submit'
                                >
                                    Publicar
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            )}
        </Formik>
    );
}

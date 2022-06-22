import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from './TextField';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, useParams } from 'react-router-dom';
import StarRating from './StarRating/StarRating';

export default function EditReview({ reviews, reviewChange, reviewEdit }) {
    const [rating, setRating] = useState(null);
    const { user, isAuthenticated } = useAuth0();
    let navigate = useNavigate();
    const { id } = useParams();

    const handleRating = (newRating) => {
        setRating(newRating);
    };

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
                description: `${reviewEdit}`,
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
                                .get(
                                    `http://127.0.0.1:8000/review/review/${id}`
                                )
                                .then((res) => {
                                    reviewChange(res.data.review.reverse());
                                });
                        }
                    });
            }}
        >
            {(formik) => (
                <div>
                    <h1 className='my-4 font-weight-bold .display-4'>
                        Ingresar Comentario
                    </h1>
                    <Form>
                        <StarRating
                            rating={rating}
                            ratingChange={handleRating}
                        />
                        <TextField
                            label='description'
                            name='description'
                            type='text'
                        />
                        <button className='btn btn-dark mt-3' type='submit'>
                            Register
                        </button>
                        <button
                            className='btn btn-danger mt-3 ml-3'
                            type='reset'
                        >
                            Reset
                        </button>
                    </Form>
                </div>
            )}
        </Formik>
    );
}

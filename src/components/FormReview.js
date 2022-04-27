import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from './TextField';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function FormReview() {
    const { user, isAuthenticated } = useAuth0();
    let navigate = useNavigate();
    const { id } = useParams();

    const validate = Yup.object({
        username: Yup.string()
            .max(25, 'Must be 15 characters or less')
            .required('Required'),
        description: Yup.string()
            .max(50, 'maximo 50 caracteres')
            .required('desc is required'),
        rating: Yup.number()
            .max(5, 'rating must bea 5 stars')
            .required('rating is required'),
    });
    return (
        <Formik
            initialValues={{
                username: `${user.name}`,
                rating: '',
                description: '',
                parking_id: parseInt(id),
            }}
            validationSchema={validate}
            onSubmit={async (values) => {
                console.log(values);
                await axios
                    .post('http://127.0.0.1:8000/review/review/', values)
                    .then((response) => {
                        console.log(response);
                        //navigate('');
                    });
            }}
        >
            {(formik) => (
                <div>
                    <h1 className='my-4 font-weight-bold .display-4'>
                        Ingresar Comentario
                    </h1>
                    <Form>
                        <TextField
                            label='username'
                            name='username'
                            type='text'
                            disabled
                        />
                        <TextField label='rating' name='rating' type='number' />
                        <TextField
                            label='description'
                            name='description'
                            type='text'
                        />
                        <TextField
                            label='parking_id'
                            name='parking_id'
                            type='number'
                            disabled
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

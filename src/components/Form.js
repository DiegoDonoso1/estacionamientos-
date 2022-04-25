import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export default function FormEsta() {
    const { user, isAuthenticated } = useAuth0();
    let navigate = useNavigate();

    const validate = Yup.object({
        username: Yup.string()
            .max(25, 'Must be 15 characters or less')
            .required('Required'),
        tittle: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        desc: Yup.string()
            .max(50, 'maximo 50 caracteres')
            .required('desc is required'),
        rating: Yup.number()
            .max(5, 'rating must bea 5 stars')
            .required('rating is required'),
        lat: Yup.number()
            .max(90, 'latitud incorrrecta')
            .required('lat is required'),
        long: Yup.number()
            .max(90, 'long incorrrecta')
            .required('long is required'),
    });
    return (
        <Formik
            initialValues={{
                username: `${user.name}`,
                tittle: '',
                desc: '',
                rating: '',
                lat: '',
                long: '',
            }}
            validationSchema={validate}
            onSubmit={async (values) => {
                await axios
                    .post('http://127.0.0.1:8000/api/estacionamiento/', values)
                    .then((response) => {
                        navigate(`/estacionamientos/${response.data.id}`);
                    });
            }}
        >
            {(formik) => (
                <div>
                    <h1 className='my-4 font-weight-bold .display-4'>
                        Ingresar estacionamiento
                    </h1>
                    <Form>
                        <TextField
                            label='username'
                            name='username'
                            type='text'
                            disabled
                        />
                        <TextField label='tittle' name='tittle' type='text' />
                        <TextField label='desc' name='desc' type='text' />
                        <TextField label='rating' name='rating' type='int' />
                        <TextField label='lat' name='lat' type='int' />
                        <TextField label='long' name='long' type='int' />
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

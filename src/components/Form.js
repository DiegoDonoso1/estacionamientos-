import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { getUser } from '../api/Estacionamiento';

export default function FormEsta({ coordinates, address }) {
    const { user } = useAuth0();
    const [userId, setuserId] = useState();

    let navigate = useNavigate();

    const validate = Yup.object({
        username: Yup.string()
            .max(25, 'Must be 15 characters or less')
            .required('Required'),
        tittle: Yup.string()
            .max(40, 'Must be 20 characters or less')
            .required('Required'),
        desc: Yup.string()
            .max(50, 'maximo 50 caracteres')
            .required('desc is required'),
        precio: Yup.number()
            .min(4, 'precio min 4')
            .required('precio is required'),
        direccion: Yup.string(),
    });

    const getDataUser = async () => {
        const data = await getUser();
        let result = null;
        data.map((res) => {
            // eslint-disable-next-line eqeqeq
            if (res.correo === user.name) {
                result = res.id;
            }
        });
        setuserId(result);
    };
    getDataUser();

    return (
        <Formik
            initialValues={{
                username: `${user.name}`,
                tittle: '',
                desc: '',
                precio: '',
                direccion: `${address}`,
                imagenes: [],
                lat: `${coordinates.lat}`,
                long: `${coordinates.lng}`,
                user_id: ``,
            }}
            //validationSchema={validate}
            onSubmit={async (values) => {
                let data = new FormData();

                data.append('username', values.username);
                data.append('tittle', values.tittle);
                data.append('desc', values.desc);
                data.append('precio', values.precio);
                data.append('direccion', values.direccion);
                data.append('imagenes', values.imagenes);
                data.append('lat', values.lat);
                data.append('long', values.long);
                data.append('user_id', userId);

                console.log(values.imagenes);

                await axios
                    .post('http://127.0.0.1:8000/api/estacionamiento/', data)
                    .then((response) => {
                        navigate(`/estacionamientos/${response.data.id}`);
                    });
            }}
        >
            {(formProps) => (
                <div>
                    <h1 className='my-4 font-weight-bold .display-4'>
                        Ingresar estacionamiento
                    </h1>
                    <Form enctype='multipart/form-data'>
                        <TextField
                            label='correo'
                            name='username'
                            type='text'
                            disabled
                        />
                        <TextField label='título' name='tittle' type='text' />
                        <TextField label='descripción estacionamiento' name='desc' type='text' />
                        <TextField label='precio' name='precio' type='int' />
                        <input
                            name='imagenes'
                            type='file'
                            onChange={(event) =>
                                formProps.setFieldValue(
                                    'imagenes',
                                    event.target.files[0]
                                )
                            }
                            multiple
                        />
                        <TextField
                            label='dirección'
                            name='direccion'
                            type='string'
                        />
                        <TextField label='' name='lat' type='hidden' />
                        <TextField label='' name='long' type='hidden' />
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

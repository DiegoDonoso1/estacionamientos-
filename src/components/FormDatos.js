import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export default function FormDatos() {
    const navigate = useNavigate();
    const { user, isLoading } = useAuth0();

    const validate = Yup.object({
        username: Yup.string()
            .max(25, 'Must be 15 characters or less')
            .required('Required'),
        nombre: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('nombre Required'),
        apellidoP: Yup.string()
            .max(50, 'maximo 50 caracteres')
            .required('apellido paterno is required'),
        apellidoM: Yup.string()
            .max(50, 'maximo 50 caracteres')
            .required('apellido materno is required'),
        celular: Yup.number()
            .max(9, 'rating must bea 5 stars')
            .required('celular is required'),
        fechaNacimiento: Yup.date().required('fecha is required'),
        rut: Yup.string()
            .min(9, 'min 9')
            .max(10, 'max 10')
            .required('long is required'),
    });
    if (!isLoading)
        return (
            <Formik
                initialValues={{
                    username: ``,
                    nombre: '',
                    apellidoP: '',
                    apellidoM: '',
                    celular: '',
                    rut: '',
                    fechaNacimiento: '',
                }}
                /* validationSchema={validate} */
                onSubmit={async (values) => {
                    let data = new FormData();

                    data.append('username', user.name);
                    data.append('nombre', values.nombre);
                    data.append('apellidoP', values.apellidoP);
                    data.append('apellidoM', values.apellidoM);
                    data.append('celular', values.celular);
                    data.append('rut', values.rut);
                    data.append('fechaNacimiento', values.fechaNacimiento);

                    await axios.post('http://127.0.0.1:8000/user/user/', data)
                    .then((response) => {
                        console.log(response)
                            navigate(`/`);
                        });
                }}
            >
                {(formik) => (
                    <div className='container'>
                        <h1 className='my-4 font-weight-bold .display-4'>
                            Ingrese sus datos
                        </h1>
                        <Form>
                            <div className='row'>
                                <div className='col-6'>
                                    <TextField
                                        label='username'
                                        name='username'
                                        type='text'
                                        disabled
                                    />
                                </div>
                                <div className='col-6'>
                                    <TextField
                                        label='nombre'
                                        name='nombre'
                                        type='text'
                                    />
                                </div>
                                <div className='col-6'>
                                    <TextField
                                        label='apellido paterno'
                                        name='apellidoP'
                                        type='text'
                                    />
                                </div>
                                <div className='col-6'>
                                    <TextField
                                        label='apellido materno'
                                        name='apellidoM'
                                        type='text'
                                    />
                                </div>
                                <div className='col-6'>
                                    <TextField
                                        label='celular'
                                        name='celular'
                                        type='int'
                                    />
                                </div>
                                <div className='col-6'>
                                    <TextField
                                        label='rut'
                                        name='rut'
                                        type='text'
                                    />
                                </div>
                            </div>

                            <TextField
                                label='fecha nacimiento'
                                name='fechaNacimiento'
                                type='date'
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

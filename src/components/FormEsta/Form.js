import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { TextField } from '../TextField';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { getUser } from '../../api/Estacionamiento';
import './Form.css';
import { Form as Forms } from 'react-bootstrap';

export default function FormEsta({ coordinates, address }) {
    const { user } = useAuth0();
    const [userId, setuserId] = useState();
    const [images, setImages] = useState([]);

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

    const changeInput = (e) => {
        //esto es el indice que se le dará a cada imagen, a partir del indice de la ultima foto
        let indexImg;

        //aquí evaluamos si ya hay imagenes antes de este input, para saber en dónde debe empezar el index del proximo array
        if (images.length > 0) {
            indexImg = images[images.length - 1].index + 1;
        } else {
            indexImg = 0;
        }

        let newImgsToState = readmultifiles(e, indexImg);
        let newImgsState = [...images, ...newImgsToState];
        setImages(newImgsState);
    };

    function readmultifiles(e, indexInicial) {
        const files = e.currentTarget.files;

        //el array con las imagenes nuevas
        const arrayImages = [];

        Object.keys(files).forEach((i) => {
            const file = files[i];

            let url = URL.createObjectURL(file);

            //console.log(file);
            arrayImages.push({
                index: indexInicial,
                name: file.name,
                url,
                file,
            });

            indexInicial++;
        });

        //despues de haber concluido el ciclo retornamos las nuevas imagenes
        return arrayImages;
    }

    function deleteImg(indice) {
        //console.log("borrar img " + indice);

        const newImgs = images.filter(function (element) {
            return element.index !== indice;
        });
        setImages(newImgs);
    }

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
                lat: `${coordinates.lat}`,
                long: `${coordinates.lng}`,
                user_id: ``,
            }}
            //validationSchema={validate}
            onSubmit={async (values) => {
                let data = new FormData();
                var files = images;
                for (var i = 0; i < files.length; i++) {
                    data.append('imagenes', files[i].file);
                }

                data.append('username', values.username);
                data.append('tittle', values.tittle);
                data.append('desc', values.desc);
                data.append('precio', values.precio);
                data.append('direccion', values.direccion);
                /* data.append('imagenes', files[0], files[1]); */
                data.append('lat', values.lat);
                data.append('long', values.long);
                data.append('user_id', userId);
                await axios
                    .post('http://127.0.0.1:8000/api/estacionamiento/', data)
                    .then((response) => {
                        navigate(`/estacionamientos/${response.data.id}`);
                    });
            }}
        >
            {(formProps) => (
                <div className=''>
                    <h1 className='my-4 font-weight-bold .display-4'>
                        Ingresar estacionamiento
                    </h1>
                    <Form enctype='multipart/form-data'>
                        <TextField
                            label='Correo'
                            name='username'
                            type='text'
                            disabled
                        />
                        <TextField label='Título' name='tittle' type='text' />
                        <TextField
                            label='Descripción estacionamiento'
                            name='desc'
                            type='text'
                        />
                        <TextField label='Precio' name='precio' type='int' />
                        <Forms.Group controlId='imagenes' className='mb-3'>
                            <Forms.Label>Imagenes</Forms.Label>
                            <Forms.Control
                                type='file'
                                multiple
                                name='imagenes'
                                onChange={
                                    ((event) =>
                                        formProps.setFieldValue(
                                            'imagenes',
                                            event.target.files
                                        ),
                                    changeInput)
                                }
                            />
                        </Forms.Group>
                        {/* Input funcional antiguo  */}
                        {/* <input
                            name='imagenes'
                            type='file'
                            onChange={
                                ((event) =>
                                    formProps.setFieldValue(
                                        'imagenes',
                                        event.target.files
                                    ),
                                changeInput)
                            }
                            multiple
                        /> */}
                        <div className='row mt-2 '>
                            {images.map((imagen) => (
                                <div
                                    className='col-6 col-sm-4 col-lg-3 square'
                                    key={imagen.index}
                                >
                                    <div className='content_img '>
                                        <button
                                            className='position-absolute btn btn-danger'
                                            onClick={deleteImg.bind(
                                                this,
                                                imagen.index
                                            )}
                                        >
                                            x
                                        </button>
                                        <img
                                            alt='algo'
                                            src={imagen.url}
                                            data-toggle='modal'
                                            data-target='#ModalPreViewImg'
                                            className='img-responsive '
                                        ></img>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <TextField
                            label='Dirección'
                            name='direccion'
                            type='string'
                        />
                        <button className='btn btn-dark mt-3' type='submit'>
                            Registrar
                        </button>
                    </Form>
                </div>
            )}
        </Formik>
    );
}

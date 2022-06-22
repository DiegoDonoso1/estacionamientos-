import { React, useState } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { TextField } from '../components/TextField';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import Editardata from '../assets/Editardata.png';

export default function EditarEsta() {
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const { id } = useParams();
    const { user } = useAuth0();
    const [userId, setuserId] = useState();
    const datos = useOutletContext();
    let navigate = useNavigate();

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
    };

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

    return (
        <Formik
            initialValues={{
                tittle: `${datos[2]}`,
                desc: `${datos[3]}`,
                precio: `${datos[0]}`,
                direccion: `${address}`,
                lat: `${coordinates.lat}`,
                long: `${coordinates.lng}`,
            }}
            //validationSchema={validate}
            onSubmit={async (values) => {
                values.lat = coordinates.lat;
                values.long = coordinates.lng;
                values.direccion = address;
                console.log(values.lat);
                /* let data = new FormData();

                data.append('tittle', values.tittle);
                data.append('desc', values.desc);
                data.append('precio', values.precio);
                data.append('direccion', address);
                data.append('lat', coordinates.lat);
                data.append('long', coordinates.lng); */

                await axios
                    .put(
                        `http://127.0.0.1:8000/api/estacionamiento/${datos[4]}`,
                        values
                    )
                    .then((response) => {
                        navigate(`/estacionamientos/${response.data.id}`, {
                            replace: true,
                        });
                    });
            }}
        >
            {(formProps) => (
                <div className='container' style={{ height: '100vh' }}>
                    <div className='row'>
                        <div className='col-xl-6 col-lg-6 col-12 align-self-center'>
                            <h1 className='my-4 font-weight-bold .display-4'>
                                Editar tu estacionamiento
                            </h1>
                            <Form>
                                <TextField
                                    label='Título Estacionamiento'
                                    name='tittle'
                                    type='text'
                                />
                                <TextField
                                    label='Descripción estacionamiento'
                                    name='desc'
                                    type='text'
                                />
                                <TextField
                                    label='Precio'
                                    name='precio'
                                    type='int'
                                />

                                <div>
                                    <PlacesAutocomplete
                                        value={address}
                                        onChange={setAddress}
                                        onSelect={handleSelect}
                                    >
                                        {({
                                            getInputProps,
                                            suggestions,
                                            getSuggestionItemProps,
                                            loading,
                                        }) => (
                                            <div className='mt-3'>
                                                <>
                                                    <div className=''>
                                                        <input
                                                            {...getInputProps({
                                                                placeholder:
                                                                    'Ingresa tu dirección',
                                                            })}
                                                        />
                                                    </div>
                                                </>

                                                <div>
                                                    {loading ? (
                                                        <div>...loading</div>
                                                    ) : null}

                                                    {suggestions.map(
                                                        (suggestion) => {
                                                            const style = {
                                                                backgroundColor:
                                                                    suggestion.active
                                                                        ? '#41b6e6'
                                                                        : '#fff',
                                                            };

                                                            return (
                                                                <div
                                                                    {...getSuggestionItemProps(
                                                                        suggestion,
                                                                        {
                                                                            style,
                                                                        }
                                                                    )}
                                                                >
                                                                    {
                                                                        suggestion.description
                                                                    }
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </PlacesAutocomplete>
                                </div>
                                <button
                                    className='btn btn-dark mt-3'
                                    type='submit'
                                >
                                    Editar
                                </button>
                            </Form>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-12 my-auto'>
                            <img
                                className='img-fluid '
                                src={Editardata}
                                alt=''
                            />
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
}

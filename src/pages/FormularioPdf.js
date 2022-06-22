import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { TextField } from '../components/TextField';
import { Form as FormSelect } from 'react-bootstrap/';
import Calendario from '../components/Calendario';
import moment from 'moment';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default function FormularioPdf({ userId }) {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [banco, setBanco] = useState();
    const [fechaI, setFechaI] = useState(new Date());
    const { id } = useParams();
    useEffect(() => {
        const getReviews = async () => {
            await axios
                .get(`http://127.0.0.1:8000/api/estacionamiento/pdf/${id}`, {
                    responseType: 'blob',
                })
                .then((res) => {
                    const url = window.URL.createObjectURL(
                        new Blob([res.data])
                    );
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'Ticket.pdf');
                    document.body.appendChild(link);
                    link.click();
                });
        };
        /* getReviews(); */
    }, []);

    const handleclick = (e) => {
        setBanco(e.currentTarget.value);
    };
    const handleCalendario = (reviewChanges) => {
        setFechaI(reviewChanges);
    };

    return (
        <Formik
            initialValues={{
                nMeses: ``,
                banco: ``,
                fechaI: ``,
                nCuenta: ``,
                user_id: ``,
                nEstacionamiento: ``,
                nBienes: ``,
                nombreEsta: ``,
                nInsc: ``,
            }}
            //validationSchema={validate}
            onSubmit={async (values) => {
                let data = new FormData();
                data.append('banco', banco);
                data.append('nMeses', values.nMeses);
                data.append('nCuenta', values.nCuenta);
                data.append('fechaI', moment(fechaI).format('YYYY-MM-DD'));
                data.append('nEstacionamiento', values.nEstacionamiento);
                data.append('nBienes', values.nBienes);
                data.append('nombreEsta', values.nombreEsta);
                data.append('nInsc', moment(startDate).format('YYYY-MM-DD'));
                data.append('id', id);

                await axios
                    .post(`http://127.0.0.1:8000/datosContrato/pdf/`, data)
                    .then((response) => {
                        axios
                            .get(
                                `http://127.0.0.1:8000/api/estacionamiento/pdf/${id}`,
                                {
                                    responseType: 'blob',
                                }
                            )
                            .then((res) => {
                                const url = window.URL.createObjectURL(
                                    new Blob([res.data])
                                );
                                const link = document.createElement('a');
                                link.href = url;
                                link.setAttribute('download', 'Ticket.pdf');
                                document.body.appendChild(link);
                                link.click();
                                navigate(`/estacionamientos/${id}`);
                                MySwal.fire('Contrato generado correctamente');
                            });
                    });
            }}
        >
            {(formProps) => (
                <div className='container mt-5' style={{ height: '80vh' }}>
                    <h1 className='my-4 font-weight-bold .display-4'>
                        Generar Contrato PDF
                    </h1>
                    <p className='my-4 '>
                        Para poder generar tu contrato necesitamos que nos
                        brindes algunos datos adicionales.
                    </p>
                    <Form>
                        <div className='row align-items-center'>
                            <div className='col-6 mb-2'>
                                <label>Banco</label>
                                <FormSelect.Select
                                    aria-label='Default select example'
                                    name='banco'
                                    onChange={handleclick}
                                    value={banco}
                                >
                                    <option>Selecciona tu Banco</option>
                                    <option>BANCO DE CHILE</option>
                                    <option>BANCO INTERNACIONAL</option>
                                    <option>SCOTIABANK CHILE</option>
                                    <option>
                                        BANCO DE CREDITO E INVERSIONES
                                    </option>
                                    <option>BANCO BICE</option>
                                    <option>BANCO SANTANDER-CHILE </option>
                                    <option>BANCO ITAÚ CORPBANCA</option>
                                    <option>BANCO FALABELLA</option>
                                    <option>BANCO RIPLEY </option>
                                    <option>BANCO DEL ESTADO</option>
                                </FormSelect.Select>

                                <TextField
                                    label='N.º Cuenta Corriente'
                                    name='nCuenta'
                                    type='number'
                                />
                            </div>
                            <div className='col-6 mb-2'>
                                <TextField
                                    label='N.º de meses del arriendo'
                                    name='nMeses'
                                    type='number'
                                />
                                <label>Fecha de inicio del arriendo</label>
                                <Calendario
                                    handleCalendario={handleCalendario}
                                    fechaI={fechaI}
                                />
                            </div>
                            <div className='col-6 mb-2'>
                                <TextField
                                    label='Nombre del edificio donde esta ubicado el estacionamiento'
                                    name='nombreEsta'
                                    type='text'
                                />
                                <TextField
                                    label='N.º de estacionamiento'
                                    name='nEstacionamiento'
                                    type='number'
                                />
                            </div>
                            <div className='col-6 mb-2'>
                                <TextField
                                    label='N.º de inscripción en bienes raíces'
                                    name='nBienes'
                                    type='number'
                                />
                                <label>
                                    Año de inscripción en bienes raíces
                                </label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    showYearPicker
                                    dateFormat='yyyy'
                                />
                            </div>
                        </div>
                        <button className='btn btn-dark mt-3' type='submit'>
                            Generar
                        </button>
                    </Form>
                </div>
            )}
        </Formik>
    );
}

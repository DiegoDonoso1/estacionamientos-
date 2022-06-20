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

export default function FormularioPdf({ userId }) {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
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
            }}
            //validationSchema={validate}
            onSubmit={async (values) => {
                let data = new FormData();
                data.append('banco', banco);
                data.append('nMeses', values.nMeses);
                data.append('nCuenta', values.nCuenta);
                data.append('fechaI', moment(fechaI).format('YYYY-MM-DD'));
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
                <div className=''>
                    <h1 className='my-4 font-weight-bold .display-4'>
                        Generar Contrato PDF
                    </h1>
                    <Form>
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
                            <option>BANCO DE CREDITO E INVERSIONES</option>
                            <option>BANCO BICE</option>
                            <option>BANCO SANTANDER-CHILE </option>
                            <option>BANCO ITAÚ CORPBANCA</option>
                            <option>BANCO FALABELLA</option>
                            <option>BANCO RIPLEY </option>
                            <option>BANCO DEL ESTADO</option>
                        </FormSelect.Select>

                        <TextField
                            label='Nº Cuenta Corriente'
                            name='nCuenta'
                            type='number'
                        />
                        <TextField
                            label='Nº de meses del arriendo'
                            name='nMeses'
                            type='number'
                        />
                        <Calendario
                            handleCalendario={handleCalendario}
                            fechaI={fechaI}
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

import { useEffect, useState } from 'react';
import { Container, Table, Button, Row, Col, Dropdown } from 'react-bootstrap';
import { useNavigate, Outlet, useLocation, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import axios from 'axios';
import './AdministratPage.css';

export default function AdministrarPage(props) {
    const [busqueda, setBusqueda] = useState('');
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const [pins, setPins] = useState([]);
    const [imagenes, setImagenes] = useState([]);
    let location = useLocation();
    const admin = props.admin;
    const [desc, SetDesc] = useState();
    const [tittle, SetTittle] = useState();
    const [precio, SetPrecio] = useState();
    const [direccion, SetDireccion] = useState();
    const [idEstacionamiento, SetIdidEstacionamiento] = useState();
    const [long, SetLong] = useState();
    const [lat, SetLat] = useState();
    const [tabla, setTabla] = useState([]);
    const [tablaImagen, setTablaImagen] = useState();

    const handleSearch = (e) => {
        setBusqueda(e.currentTarget.value);
        filtrar(e.currentTarget.value);
    };

    const handleId = (e) => {
        navigate(`/estacionamientos/${e.currentTarget.id}`);
    };

    const filtrar = (terminoBusqueda) => {
        let resultadoBusqueda = tabla.filter((elemento) => {
            if (
                elemento.tittle
                    .toString()
                    .toLowerCase()
                    .includes(terminoBusqueda.toLowerCase())
            ) {
                return elemento;
            }
        });
        let array = [];
        resultadoBusqueda.map((item) => {
            tablaImagen.filter((elemen) => {
                if (
                    elemen.producto_id.toString().includes(item.id.toString())
                ) {
                    array.push(elemen);
                }
            });
        });

        setImagenes(array);
        setPins(resultadoBusqueda);
    };

    const handleClick = (e) => {
        pins.map((item, index) => {
            if (index == e.currentTarget.id) {
                SetDesc(item.desc);
                SetTittle(item.tittle);
                SetPrecio(item.precio);
                SetDireccion(item.direccion);
                SetIdidEstacionamiento(item.id);
                SetLong(item.long);
                SetLat(item.lat);
            }
        });
        navigate(`editar/`, { state: true });
    };

    const handleClickDelete = (e) => {
        const id = e.currentTarget.id;
        MySwal.fire({
            icon: 'warning',
            title: 'Estas seguro que quieres eliminar este estacionamiento?',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#FF424D',
            cancelButtonColor: '#9E9796',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios
                    .delete(`http://127.0.0.1:8000/api/estacionamiento/${id}`)
                    .then((data) => {
                        if (data.data.message == 'success') {
                            axios
                                .get(
                                    `http://127.0.0.1:8000/api/estacionamiento/`
                                )
                                .then((data) =>
                                    setPins(data.data.estacionamientos)
                                );
                        }
                    });
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'El estacionamiento ha sido borrado',
                        showConfirmButton: false,
                        timer: 1500
                        })
            }
        });
    };

    useEffect(() => {
        const getPins = async () => {
            try {
                const imagen = [];
                const res = await axios.get(
                    'http://127.0.0.1:8000/api/estacionamiento/'
                );
                const imagenes = res.data.imagenes;
                const estacionamientos = res.data.estacionamientos;
                estacionamientos.map((resp, i) => {
                    imagenes.map((item) => {
                        if (item.producto_id == resp.id) {
                            imagen.push(item);
                        }
                    });
                });
                const result = imagen.reduce((acc, item, i) => {
                    if (!acc.find((d) => d.producto_id == item.producto_id)) {
                        acc.push(item);
                    }
                    return acc;
                }, []);
                setImagenes(result);
                setTablaImagen(result);
                setPins(estacionamientos);
                setTabla(estacionamientos);
            } catch (err) {
                console.log(err);
            }
        };
        getPins();
    }, []);

    return (
        <Container>
            {location.state && admin ? (
                // eslint-disable-next-line no-sequences
                <Outlet
                    context={[
                        precio,
                        direccion,
                        tittle,
                        desc,
                        idEstacionamiento,
                        lat,
                        long,
                    ]}
                />
            ) : (
                <>
                    <Row className='mt-5 mb-4'>
                        <Col className=''>
                            <input
                                value={busqueda}
                                placeholder='busqueda por nombre'
                                className='form-control'
                                onChange={handleSearch}
                            />
                        </Col>
                        <Col className='p-0'>
                            <Button
                                variant='danger'
                                className=''
                                style={
                                    ({
                                        backgroundColor: 'rgb(255,66,77)',
                                    },
                                    { boxShadow: 'none' })
                                }
                            >
                                Buscar
                            </Button>
                        </Col>
                    </Row>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ver</th>
                                <th>Nombre</th>
                                <th>Imagenes</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pins.map((esta, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td id={esta.id} onClick={handleId}>
                                        <Icon
                                            icon='akar-icons:eye-open'
                                            color='#3b3938'
                                            width='30'
                                            height='30'
                                        />
                                    </td>

                                    <td>{esta.tittle}</td>
                                    <td>
                                        <img
                                            className='table-img rounded-3'
                                            src={`http://127.0.0.1:8000/media/${imagenes[index].imagen}`}
                                            alt=''
                                            height={'300px'}
                                            width={'250px'}
                                        />
                                    </td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle
                                                style={{
                                                    backgroundColor: '#fff',
                                                }}
                                                variant='gray'
                                                id='dropdown-basic'
                                                size='sm'
                                            >
                                                <Icon
                                                    icon='majesticons:more-menu-vertical'
                                                    width='30'
                                                    height='30'
                                                />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    id={index}
                                                    onClick={handleClick}
                                                >
                                                    Editar
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    id={esta.id}
                                                    onClick={handleClickDelete}
                                                >
                                                    Eliminar
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        {/* <Button
                                            className='mb-xl-0 mb-2'
                                            id={index}
                                            onClick={handleClick}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            id={esta.id}
                                            className='ms-1 bg-danger'
                                            variant='danger'
                                            style={
                                                ({
                                                    backgroundColor:
                                                        'rgb(255,66,77)',
                                                },
                                                { boxShadow: 'none' })
                                            }
                                            onClick={handleClickDelete}
                                        >
                                            Eliminar
                                        </Button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    );
}

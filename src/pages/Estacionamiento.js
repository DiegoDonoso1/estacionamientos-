import { React, useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
import Review from '../components/Review';
import { useAuth0 } from '@auth0/auth0-react';
import SectionCarousel from '../components/SectionCarousel';
import SectionDesc from '../components/SectionDesc';
import SectionStars from '../components/SectionStars';
import axios from 'axios';
import Footer from '../components/Footer';
import { getUserExact } from '../api/Estacionamiento';
import { Button, Dropdown } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Estacionamiento({ promedioChanged }) {
    const { isLoading, user, isAuthenticated } = useAuth0();
    let location = useLocation();
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const { id } = useParams();
    const [estacionamiento, setEstacionamiento] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [imagenes, setImagenes] = useState([]);
    const [nombre, setNombre] = useState();
    const [correo, setCorreo] = useState();
    const [userUnique, setUserUnique] = useState();
    const [promedio, setPromedio] = useState();

    const desc = estacionamiento.desc;
    const tittle = estacionamiento.tittle;
    const precio = estacionamiento.precio;
    const imagen = imagenes;
    const direccion = estacionamiento.direccion;
    const idEstacionamiento = estacionamiento.id;
    const long = estacionamiento.long;
    const lat = estacionamiento.lat;
    const user_id = estacionamiento.user_id;

    const handleClick = (e) => {
        navigate(`editar/`, { state: true });
    };

    const handlePromedio = (reviewChanges) => {
        setPromedio(reviewChanges);
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
                axios.delete(`http://127.0.0.1:8000/api/estacionamiento/${id}`);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Tu Estacionamiento ha sido borrado',
                    showConfirmButton: false,
                    timer: 1500
                    })
                navigate('/');
            }
        });
    };

    const handleClickGenerate = (e) => {
        navigate(`/generarpdf/${e.currentTarget.id}`);
    };

    const handleReview1 = (reviewChanges) => {
        setUserUnique(reviewChanges);
    };

    const sumaStars = reviews.reduce(
        function (acumulador, nexValue) {
            return {
                rating: acumulador.rating + nexValue.rating,
            };
        },
        { rating: 0 }
    );

    /*  promedioChanged(sumaStars.rating / reviews.length); */

    useEffect(() => {
        const getReviews = async () => {
            const reviewList = [];
            const { data } = await axios.get(
                `http://127.0.0.1:8000/review/review/${id}`
            );
            if (data.review != undefined) {
                const result = await data.review;
                result.map((res) => {
                    if (res.parking_id == id) {
                        reviewList.push(res);
                    }
                });
                const resulta = reviewList.reverse(); /* .reduce((ac, item) => {
                    if (!ac.find((d) => d.user == item.user)) {
                        ac.push(item);
                    }
                    return ac;
                }, []); */
                setUserUnique(resulta);
                setReviews(reviewList);
                setPromedio(data.promedio);
            }
        };
        getReviews();
    }, []);

    const response = async function () {
        const data = await fetch(
            `http://127.0.0.1:8000/api/estacionamiento/${id}`
        );
        const res = await data.json();
        const response = await getUserExact(res.estacionamientos.user_id);
        if (response.id === res.estacionamientos.user_id) {
            setNombre(`${response.nombre} ${response.apellido_P}`);
            setCorreo(response.correo);
            setEstacionamiento(res.estacionamientos);
            const array = [];
            res.imagen.map((item) => array.push(item));
            setImagenes(array);
        }
    };

    useEffect(() => {
        response();
    }, [location.state]);

    if (!isLoading )
        return (
            <>
                {location.state ? (
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
                        {isAuthenticated && correo == user.email && (
                            <div
                                className='container-fluid text-end'
                                style={{
                                    backgroundColor: 'var(--main-bg-color)',
                                }}
                            >
                                <Dropdown>
                                    <Dropdown.Toggle
                                        style={{ backgroundColor: '#F5F4F2' }}
                                        id='dropdown-basic'
                                        size='sm'
                                        variant='gray'
                                    >
                                        <Icon
                                            icon='majesticons:more-menu-vertical'
                                            color='black'
                                            width='30'
                                            height='30'
                                        />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            onClick={handleClickGenerate}
                                            id={idEstacionamiento}
                                        >
                                            Generar contrato
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            id={id}
                                            onClick={handleClick}
                                        >
                                            Editar
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={handleClickDelete}
                                            id={idEstacionamiento}
                                        >
                                            Eliminar
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {/* <Button
                                    onClick={handleClick}
                                    className='mt-2 me-3'
                                >
                                    editar
                                </Button>
                                <Button
                                    id={idEstacionamiento}
                                    onClick={handleClickDelete}
                                    className='mt-2 me-3'
                                >
                                    Eliminar
                                </Button> */}
                            </div>
                        )}

                        <div className=''>
                            <SectionCarousel
                                precio={precio}
                                imagen={imagen}
                                direccion={direccion}
                                tittle={tittle}
                            />
                            <SectionDesc
                                tittle={tittle}
                                desc={desc}
                                nombre={nombre}
                                idEstacionamiento={idEstacionamiento}
                                user_id={user_id}
                                reviews={reviews}
                            />
                        </div>
                        <SectionStars promedio={promedio} />
                        <Review
                            reviews={reviews}
                            reviewChanged={handleReview1}
                            UserUnique={userUnique}
                            promedioChanged={handlePromedio}
                            promedio={promedio}
                        />
                        <Footer />
                    </>
                )}
            </>
        );
}

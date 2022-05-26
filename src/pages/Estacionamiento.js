import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Review from '../components/Review';
import { useAuth0 } from '@auth0/auth0-react';
import SectionCarousel from '../components/SectionCarousel';
import SectionDesc from '../components/SectionDesc';
import SectionStars from '../components/SectionStars';
import axios from 'axios';
import Footer from '../components/Footer';
import { getUserExact } from '../api/Estacionamiento';

export default function Estacionamiento() {
    const { isLoading } = useAuth0();
    const { id } = useParams();
    const [estacionamiento, setEstacionamiento] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [imagenes, setImagenes] = useState([]);
    const [nombre, setNombre] = useState();

    const desc = estacionamiento.desc;
    const tittle = estacionamiento.tittle;
    const precio = estacionamiento.precio;
    const imagen = imagenes.imagen;
    const direccion = estacionamiento.direccion;
    const idEstacionamiento= estacionamiento.id

    const sumaStars = reviews.reduce(
        function (acumulador, nexValue) {
            return {
                rating: acumulador.rating + nexValue.rating,
            };
        },
        { rating: 0 }
    );

    const promedio = sumaStars.rating / reviews.length;

    useEffect(() => {
        response();
    }, []);

    useEffect(() => {
        const getReviews = async () => {
            const { data } = await axios.get(
                `http://127.0.0.1:8000/review/review/`
            );
            // eslint-disable-next-line eqeqeq
            const result = data.reviews.filter((review) => {
                // eslint-disable-next-line eqeqeq
                return review.parking_id == id;
            });
            setReviews(result);
        };
        getReviews();
    }, []);

    const response = async () => {
        const data = await fetch(
            `http://127.0.0.1:8000/api/estacionamiento/${id}`
        );
        const res = await data.json();
        const response = await getUserExact(res.estacionamientos.user_id);
        if (response.id === res.estacionamientos.user_id) {
            setNombre(`${response.nombre} ${response.apellido_P}`);
            setEstacionamiento(res.estacionamientos);
            setImagenes(res.imagen);
        }
    };

    if (!isLoading)
        return (
            <>
                <div className=''>
                    <SectionCarousel
                        precio={precio}
                        imagen={imagen}
                        direccion={direccion}
                        tittle={tittle}
                    />
                    <SectionDesc tittle={tittle} desc={desc} nombre={nombre} idEstacionamiento=
                    {idEstacionamiento} />
                </div>
                <SectionStars promedio={promedio} />
                <Review />
                <Footer />
                {/* <div>
                    Dueño estacionamiento: {estacionamiento.username}
                    Nombre: {estacionamiento.tittle}
                </div> */}

                {/* {reviews.map(
                    (item) =>
                        (
                            
                        )
                )} */}
            </>
        );
}

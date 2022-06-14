import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Carousel.css';

export default function Carrusel(props) {
    return (
        <div className='container-fluid container-carrusel'>
            <Carousel variant='dark'>
                {props.imagen.map((i) => (
                    <Carousel.Item className='item' interval={2000}>
                        <img
                            className='d-block mx-auto img'
                            src={`http://127.0.0.1:8000/media/${i.imagen}`}
                            alt='primera imagen'
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

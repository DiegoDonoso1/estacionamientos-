import { Button } from 'react-bootstrap';
import React from 'react';
import Carrusel from './Carousel/Carousel';

export default function SectionCarousel(props) {
    return (
        <>
            <div
                className='container-fluid '
                style={{ backgroundColor: 'var(--main-bg-color)' }}
            >
                <div className='row pt-2 row justify-content-evenly'>
                    <div className='col ps-5 '>
                        <h1>{props.tittle} </h1>
                        <h6 className=''>{props.direccion}</h6>
                    </div>
                    <div className='col'>
                        <p className='lead bold fs-2 fw-normal text-center ps-xl-5'>
                            $
                            {new Intl.NumberFormat('de-DE').format(
                                props.precio
                            ) + ' '}
                            CLP
                        </p>
                    </div>
                    <div className='col-12'>
                        <Carrusel imagen={props.imagen} />
                    </div>
                </div>
            </div>
        </>
    );
}

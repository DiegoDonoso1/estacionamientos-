import React, { Component } from 'react';
import Slider from 'react-slick';

export default function SimpleSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div>
            <h2> Single Item</h2>
            <Slider {...settings}></Slider>
        </div>
    );
}

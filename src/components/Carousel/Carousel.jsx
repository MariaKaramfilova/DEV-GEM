import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function ImageCarousel ({ images }) {

    const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            respondTo: 'window',
            arrows: true,
        };

    return (
        <div style={{maxWidth:"70%",}}>
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index} style={{ }}>
                    <img src={image} alt={`Image ${index}`} style={{maxWidth:"100%"}}/>
                </div>
            ))}
        </Slider>
        </div >
    );
}


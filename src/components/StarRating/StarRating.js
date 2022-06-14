import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './StarRating.css';

export default function StarRating({ rating, ratingChange }) {
    /* const [rating, setRating] = useState(null); */
    const [hover, setHover] = useState(null);

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label>
                        <input
                            type='radio'
                            name='rating'
                            value={ratingValue}
                            onClick={() => {
                                ratingChange(ratingValue);
                            }}
                        />
                        <Icon
                            icon='ant-design:star-filled'
                            color={
                                ratingValue <= (hover || rating)
                                    ? '#FF424D'
                                    : '#e4e5e9'
                            }
                            width='31'
                            height='30'
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
}

import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Button, Stack } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { useAuth0 } from '@auth0/auth0-react';

export default function SectionStars(props) {
    const { isAuthenticated } = useAuth0();
    const prom = Math.round(props.promedio);
    return (
        <div className='container pb-5 '>
            <div className='row'>
                <div className='col ps-5 '>
                    <h3>Valoración de los usuarios</h3>
                    <Stack gap={2} className='' direction='horizontal'>
                        <p className='ps-5 pt-4 fs-2'>{prom > 0 ? prom : 0}</p>
                        <div className='pt-3 ps-2'>
                            {[...Array(5)].map((star, i) => {
                                const ratingValue = i + 1;
                                return (
                                    <Icon
                                        key={i}
                                        icon='ant-design:star-filled'
                                        color={
                                            ratingValue <= prom
                                                ? '#FF424D'
                                                : '#e4e5e9'
                                        }
                                        width='31'
                                        height='30'
                                    />
                                );
                            })}
                        </div>
                    </Stack>
                </div>

                {isAuthenticated && (
                    <div className='col text-end p-5'>
                        <Link to='addReview'>
                            <Button
                                style={
                                    ({ padding: 'auto' },
                                    { fontSize: '35px' },
                                    { boxShadow: 'none' })
                                }
                                className=' rounded-pill '
                                size='lg'
                                variant='dark'
                            >
                                Agregar comentario
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useParams, Link, useNavigate } from 'react-router-dom';
import FormReview from './FormReview';
import EditReview from './EditReview';
import { Icon } from '@iconify/react';
import { useAuth0, User } from '@auth0/auth0-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button, Dropdown } from 'react-bootstrap';

export default function Review({ reviews, reviewChanged, UserUnique }) {
    const MySwal = withReactContent(Swal);
    const { id } = useParams();
    const { isLoading, user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    const handleEdit = (e) => {
        const id = e.currentTarget.id;
        navigate('addreview');
    };

    const handleReviews2 = (reviewChanges) => {
        reviewChanged(reviewChanges);
    };

    const handleDelete = async (e) => {
        const id = e.currentTarget.id;
        MySwal.fire({
            title: 'Estas seguro?',
            text: 'No podras revertir esto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, quiero eliminar',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://127.0.0.1:8000/review/review/${id}`)
                    .then((response) => {
                        if (response.data.message == 'success') {
                            axios
                                .get(`http://127.0.0.1:8000/review/review/`)
                                .then((res) => {
                                    const resulta = res.data.reviews
                                        .reverse()
                                        .reduce((ac, item) => {
                                            if (
                                                !ac.find(
                                                    (d) => d.user == item.user
                                                )
                                            ) {
                                                ac.push(item);
                                            }
                                            return ac;
                                        }, []);
                                    reviewChanged(resulta);
                                });
                        }
                    });
                MySwal.fire(
                    'eliminado!',
                    'Tu comentario ha sido eliminado.',
                    'success'
                );
            }
        });
    };

    return (
        <>
            <Routes>
                <Route
                    path='/addReview'
                    element={
                        <FormReview
                            review={reviews}
                            reviewChange={handleReviews2}
                        />
                    }
                />

                <Route
                    path='EditReview'
                    element={
                        <EditReview
                            review={reviews}
                            reviewChange={handleReviews2}
                        />
                    }
                />
            </Routes>

            <div className='container mt-5'>
                <div className='row '>
                    <div className='col-12 pb-4 ps-5 mt-4'>
                        {UserUnique !== undefined &&
                            UserUnique.map(
                                (item, i) =>
                                    // eslint-disable-next-line eqeqeq
                                    id == item.parking_id && (
                                        <>
                                            <div className='row'>
                                                <div className='col-6'>
                                                    <h4 className='fw-bolder'>
                                                        {item.user}
                                                    </h4>
                                                </div>
                                                {isAuthenticated &&
                                                    item.user == user.email && (
                                                        <div className='col-6'>
                                                            <div className='text-end'>
                                                                <Dropdown>
                                                                    <Dropdown.Toggle
                                                                        style={{
                                                                            backgroundColor:
                                                                                '#fff',
                                                                        }}
                                                                        id='dropdown-basic'
                                                                        size='sm'
                                                                        variant='light'
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
                                                                            id={
                                                                                item.id
                                                                            }
                                                                            onClick={
                                                                                handleEdit
                                                                            }
                                                                        >
                                                                            Editar
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item
                                                                            id={
                                                                                item.id
                                                                            }
                                                                            className='ms-1'
                                                                            onClick={
                                                                                handleDelete
                                                                            }
                                                                        >
                                                                            Eliminar
                                                                        </Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                                {/* <Link to='editreview'>
                                                                    <Button
                                                                        id={
                                                                            item.id
                                                                        }
                                                                        onClick={
                                                                            handleEdit
                                                                        }
                                                                    >
                                                                        Editar
                                                                    </Button>
                                                                </Link>
                                                                <Button
                                                                    id={item.id}
                                                                    className='ms-1'
                                                                    onClick={
                                                                        handleDelete
                                                                    }
                                                                >
                                                                    Eliminar
                                                                </Button> */}
                                                            </div>
                                                        </div>
                                                    )}
                                            </div>

                                            <h6
                                                style={{
                                                    color: 'rgb(255,66,77)',
                                                }}
                                            >
                                                {item.fecha_creacion.substring(
                                                    0,
                                                    10
                                                )}
                                            </h6>
                                            <div className=''>
                                                {[...Array(5)].map(
                                                    (star, i) => {
                                                        const ratingValue =
                                                            i + 1;
                                                        return (
                                                            <Icon
                                                                key={i}
                                                                icon='ant-design:star-filled'
                                                                color={
                                                                    ratingValue <=
                                                                    item.rating
                                                                        ? '#FF424D'
                                                                        : '#e4e5e9'
                                                                }
                                                                width='31'
                                                                height='30'
                                                            />
                                                        );
                                                    }
                                                )}
                                            </div>
                                            <p className='fw-normal pt-1 pb-4'>
                                                {item.description}
                                            </p>
                                            <hr></hr>
                                        </>
                                    )
                            )}
                    </div>
                </div>
            </div>
        </>
    );
}

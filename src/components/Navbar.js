import { NavLink } from 'react-router-dom';
import './navbar.css';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutBotton from './LogoutBotton';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Icon } from '@iconify/react';

export default function NavbarComponent({ id, admin, navbar, handleNavbar }) {
    const { isAuthenticated, isLoading } = useAuth0();
    const idUser = id;

    if (!isLoading)
        return (
            <>
                {navbar ? (
                    <Navbar
                        collapseOnSelect
                        expand='lg'
                        bg='light'
                        variant='light'
                    >
                        <Container fluid>
                            <Navbar.Brand className='fs-4 fw-normal'>
                                <NavLink
                                    className='text-decoration-none text-reset '
                                    to='./'
                                >
                                    AparClick
                                    <Icon
                                        icon='ant-design:car-filled'
                                        color='#ff424d'
                                        width='31'
                                        height='30'
                                    />
                                </NavLink>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                            <Navbar.Collapse id='responsive-navbar-nav'>
                                <Nav className='me-auto'>
                                    <Nav.Link>
                                        <NavLink
                                            className='text-decoration-none text-reset'
                                            to={`/mapa`}
                                        >
                                            Estacionamientos
                                        </NavLink>
                                    </Nav.Link>
                                </Nav>
                                <Nav>
                                    <Nav.Link>
                                        {isAuthenticated && admin && (
                                            <NavLink
                                                className='text-decoration-none text-reset'
                                                to={`/administrar`}
                                            >
                                                Administrar
                                            </NavLink>
                                        )}
                                    </Nav.Link>
                                    <Nav.Link>
                                        {isAuthenticated && (
                                            <NavLink
                                                className='text-decoration-none text-reset'
                                                to={`perfil/${idUser}`}
                                            >
                                                Perfil
                                            </NavLink>
                                        )}
                                    </Nav.Link>

                                    {isAuthenticated ? (
                                        <LogoutBotton />
                                    ) : (
                                        <LoginButton />
                                    )}
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                ) : null}
            </>
        );
}

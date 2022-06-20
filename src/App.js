import { React, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import Mapa from './pages/Mapa/Mapa';
import './App.css';

import NavbarComponent from './components/Navbar';
import Estacionamiento from './pages/Estacionamiento';
import DatosPage from './pages/DatosPage';
import AdministrarPage from './pages/Administrar/AdministrarPage';
/* import Footer from '../components/Footer'; */

import Login from './pages/perfil/Perfil';

import RequiereAuth from './components/RequiereAuth';
import Formulario from './pages/FormularioPage';
import { useAuth0 } from '@auth0/auth0-react';
import ListaEstacionamientos from './pages/ListaEstacionamientos';

import { getUser } from './api/Estacionamiento';
import EditarEsta from './pages/EditarPage';
import Spinner from './components/spinner/Spinner';
import FormularioPdf from './pages/FormularioPdf';

function App() {
    const { isAuthenticated, isLoading, user } = useAuth0();
    const [usuario, setUsuario] = useState(false);
    const [userId, setUserId] = useState();
    const [admin, setAdmin] = useState();
    const [promedio, setPromedio] = useState();

    const handlePromedio = (reviewChanges) => {
        setPromedio(reviewChanges);
    };

    const handleDatos = (reviewChanges) => {
        setUsuario(reviewChanges);
    };

    if (user !== undefined) {
        const getData = async () => {
            const data = await getUser();
            let result = null;

            // eslint-disable-next-line array-callback-return

            if (user.email != undefined) {
                data.map((res) => {
                    // eslint-disable-next-line eqeqeq
                    if (res.correo == user.email) {
                        result = res;
                    }
                });
            }

            if (result.correo != null) {
                setUserId(result.id);
                setAdmin(result.admin);
                setUsuario(true);
            }
        };
        if (!isLoading) getData();
    }

    return (
        <>
            <BrowserRouter>
                <NavbarComponent id={userId} admin={admin} />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/terminos' element={<AboutPage />} />
                    <Route
                        path='/perfil/:id'
                        element={<Login promedio={promedio} />}
                    />

                    <Route
                        path='/estacionamientos/:id/*'
                        element={
                            <Estacionamiento
                                promedioChanged={handlePromedio}
                                promedio={promedio}
                            />
                        }
                    >
                        <Route path='editar' element={<EditarEsta />} />
                    </Route>

                    <Route
                        path='/administrar/*'
                        element={
                            admin ? (
                                <AdministrarPage
                                    admin={admin}
                                    userid={userId}
                                />
                            ) : (
                                <HomePage />
                            )
                        }
                    >
                        <Route path='editar' element={<EditarEsta />} />
                    </Route>

                    <Route
                        path='/formulario/*'
                        element={
                            isAuthenticated ? <Formulario /> : <RequiereAuth />
                        }
                    />

                    <Route
                        path='/generarpdf/:id'
                        element={<FormularioPdf userId={userId} />}
                    />

                    <Route
                        path='/datos'
                        element={
                            <DatosPage
                                usuario={usuario}
                                handleDatos={handleDatos}
                            />
                        }
                    />

                    <Route path='/mapa/*' element={<Mapa />}>
                        <Route
                            path='listado'
                            element={<ListaEstacionamientos />}
                        />
                    </Route>

                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

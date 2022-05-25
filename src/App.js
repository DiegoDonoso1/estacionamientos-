import { React, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import Mapa from './pages/Mapa';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import NavbarComponent from './components/Navbar';
import Estacionamiento from './pages/Estacionamiento';
import DatosPage from './pages/DatosPage';
/* import Footer from '../components/Footer'; */

import Login from './pages/Perfil';

import RequiereAuth from './components/RequiereAuth';
import Formulario from './pages/FormularioPage';
import { useAuth0 } from '@auth0/auth0-react';
import ListaEstacionamientos from './pages/ListaEstacionamientos';

import { getUser } from './api/Estacionamiento';

function App() {
    const { isAuthenticated, isLoading, user } = useAuth0();
    const [usuario, setUsuario] = useState(false);
    const [userId, setUserId] = useState();

    const getData = async () => {
        const data = await getUser();
        let result = null;
        // eslint-disable-next-line array-callback-return
        data.map((res) => {
            // eslint-disable-next-line eqeqeq
            if (res.correo == user.email) {
                result = res;
            }
        });

        if (result.correo != null) {
            setUsuario(true);
            setUserId(result.id);
        }
    };
    if (!isLoading) getData();

    return (
        <BrowserRouter>
            <NavbarComponent id={userId} />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/perfil/:id' element={<Login />} />
                <Route
                    path='/estacionamientos/:id/*'
                    element={<Estacionamiento />}
                />
                <Route
                    path='/formulario/*'
                    element={
                        isAuthenticated ? <Formulario /> : <RequiereAuth />
                    }
                />
                <Route
                    path='/datos'
                    element={usuario ? <HomePage /> : <DatosPage />}
                />

                <Route path='/mapa/*' element={<Mapa />}>
                    <Route path='listado' element={<ListaEstacionamientos />} />
                </Route>

                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import Mapa from './pages/Mapa';

import Navbar from './components/Navbar';
import Estacionamiento from './pages/Estacionamiento';

import Login from './pages/Perfil';

import RequiereAuth from './components/RequiereAuth';
import Formulario from './pages/FormularioPage';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<HomePage />} />

                <Route
                    path='/perfil'
                    element={
                        <RequiereAuth>
                            <AboutPage />
                        </RequiereAuth>
                    }
                />
                <Route
                    path='/estacionamientos/:id/*'
                    element={<Estacionamiento />}
                />
                <Route path='/formulario' element={<Formulario />} />
                <Route path='/mapa' element={<Mapa />} />
                <Route path='/login' element={<Login />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

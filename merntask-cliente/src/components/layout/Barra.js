import React, { useEffect, useContext, useCallback } from 'react';

import AuthContext from '../../context/auth/authContext';

const Barra = () => {

    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    const handleClick = () => cerrarSesion()

    return (
        <header className="app-header">
            { usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span> </p> : null }

            <nav className="nav-principal">
                <button
                    onClick={handleClick}
                    className="btn btn-blank cerrar-sesion">Cerrar Sesión
                </button>
            </nav>
        </header>
     );
}

export default Barra;
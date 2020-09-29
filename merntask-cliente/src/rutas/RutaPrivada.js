import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';

const RutaPrivada = ({ component: Component, ...props  }) => {

    const authContext = useContext(AuthContext);
    const { autenticado, usuarioAutenticado } = authContext;

    useEffect(() => {
        console.log('in useEffect usuarioAutenticado!')
        usuarioAutenticado()
    }, [])

    return (
        <Route { ...props } render={ props => !autenticado ?  (
            <Redirect to="/" />
        )  : (
            <Component {...props} />
        ) } />

     );
}

export default RutaPrivada;

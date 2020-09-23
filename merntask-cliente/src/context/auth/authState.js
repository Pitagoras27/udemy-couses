import React, { useReducer } from 'react';

import AuthContext from './authContext';
import AuthReducer from './authReducer';
import requestApi from '../../config/axios';

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXISTOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from '../../types'

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    autenticado: null,
    usuario: null,
    mensaje: null,
  }

  const [ state, dispatch ] = useReducer(AuthReducer, initialState);

  const registrarUsuario = async (data) => {

    data.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    try {
      const request = await requestApi.post('/api/usuarios/', data);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: request.data
      });

    } catch(e) {

      dispatch({
        type: REGISTRO_ERROR,
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;
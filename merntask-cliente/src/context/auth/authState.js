import React, { useReducer } from 'react';

import AuthContext from './authContext';
import AuthReducer from './authReducer';

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

  const [ state, dispath ] = useReducer(initialState, AuthReducer);

  return (
    <AuthContext.Provider
      value={{
        token,
        autenticado,
        usuario,
        mensaje,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;
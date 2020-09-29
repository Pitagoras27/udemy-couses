import React, { useReducer } from 'react';

import AuthContext from './authContext';
import AuthReducer from './authReducer';
import requestApi from '../../config/axios';
import tokenAuth from '../../config/token';

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
    cargando: true,
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
        payload: request.data,
      });
      usuarioAutenticado();
    } catch(e) {
      const typeError = (Array.isArray( e.response.data.errores))
        ? e.response.data.errores[0].msg
        : e.response.data.msg
      const alerta = {
        msg: typeError,
        categoria: 'alerta-error'
      }
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      })
    }
  }

  const usuarioAutenticado = async () => {
    const token = localStorage.getItem('token');
    if(token) {
      tokenAuth(token);
    }
    try {
      const request = await requestApi.get('/api/auth');
      dispatch({
        type: OBTENER_USUARIO,
        payload: request.data.usuario
      })
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      })
    }
  }

  const iniciarSesion = async datos => {
    try {
      const request = await requestApi.post('/api/auth', datos);
      dispatch({
        type: LOGIN_EXISTOSO,
        payload: request.data,
      })
      usuarioAutenticado();
    } catch (e) {
      const alerta = {
        msg: e.response.data.msg,
        categoria: 'alerta-error'
      }
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta
      })
    }
  }

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    })
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;
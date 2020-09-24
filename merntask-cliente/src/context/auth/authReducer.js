import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXISTOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from '../../types'

export default (state, action) => {
  switch(action.type) {
    case REGISTRO_EXITOSO:
    case LOGIN_EXISTOSO:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
      }
    case OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload
      }
    case REGISTRO_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        autenticado: null,
        mensaje: action.payload
      }
    case CERRAR_SESION:
      return {
        ...state,
        usuario: null,
        autenticado: null
      }
    default:
      return state;
  }
}
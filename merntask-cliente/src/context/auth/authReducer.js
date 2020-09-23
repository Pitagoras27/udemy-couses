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
      const token = localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        autenticado: true,
      }
    case REGISTRO_ERROR:
      return {
        ...state,
        autenticado: null,
      }
    default:
      return state;
  }
}
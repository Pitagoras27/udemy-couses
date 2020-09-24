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
        usuario: action.payload
      }
    case REGISTRO_ERROR:
    case LOGIN_ERROR:
      console.log('action.payload->', action.payload)
      return {
        ...state,
        autenticado: null,
        mensaje: action.payload
      }
    default:
      return state;
  }
}
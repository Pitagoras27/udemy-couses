import { 
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
} from '../../types';


export default (state, action) => {
    switch(action.type) {
        case TAREAS_PROYECTO:
            return {
                ...state,
                // tareasproyecto: state.tareasproyecto.filter(tarea => tarea.proyectoId === action.payload),
                tareasproyecto: action.payload,
                tareaseleccionada: null,
            }
        case AGREGAR_TAREA:
            return {
                ...state,
                tareasproyecto: [ action.payload, ...state.tareasproyecto ],
                errortarea: false,
            }
        case VALIDAR_TAREA:
            return {
                ...state,
                errortarea: true,
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.filter(tarea => tarea.id !== action.payload)
            }
        case ESTADO_TAREA:
        case ACTUALIZAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.map(tarea => tarea.id === action.payload.id ? action.payload : tarea),
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaseleccionada: action.payload,
            }
        default:
            return state;
  }
}
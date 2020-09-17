import React, { useContext } from 'react';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ({tarea}) => {
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, cambiaEstadoTarea } = tareasContext;
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;
    const [ proyectoId ] = proyecto;

    const eliminarTask = id => {
        eliminarTarea(id)
        obtenerTareas(proyectoId.id)
    }

    const handleClick = tarea => {
        if(tarea.estado) {
            tarea.estado = false
        } else {
            tarea.estado = true
        }
        cambiaEstadoTarea(tarea)
    }

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre} </p>

            <div className="estado">
                {tarea.estado 
                ?  
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => handleClick(tarea)}
                        >Completo</button>
                    )
                : 
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => handleClick(tarea)}
                        >Incompleto</button>
                    )
                }
            </div>

            <div className="acciones">
                <button 
                    type="button"
                    className="btn btn-primario"
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => eliminarTask(tarea.id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;
import React, { useContext, useState } from 'react';
import uuid from 'uuid';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareasContext from '../../context/tareas/tareaContext';

const FormTarea = () => {
    const [ tarea, guardarTarea ] = useState({
        nombre: '',
    })

    const { nombre } = tarea;
    // Extrar si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareaContext = useContext(tareasContext);
    const { errortarea, agregarTarea, validarTarea, obtenerTareas } = tareaContext;

    // Si no hay proyecto seleccionado
    if(!proyecto) return null;

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] =  proyecto;

    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value,
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        // validar
        if(nombre.trim() === '') {
            validarTarea()
            return
        }

        // agregar la nueva tarea
        tarea.id = uuid.v4();
        tarea.proyectoId = proyectoActual.id;
        tarea.estado = false;
        agregarTarea(tarea)

        obtenerTareas(proyectoActual.id)
        // reiniciar el formulario
        guardarTarea({
            nombre: ''
        })
    }

    return ( 
        <div className="formulario">
            <form onSubmit={onSubmit} >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value="Agregar Tarea"
                    />
                </div>
            </form>
            {errortarea ? (<p className="error mensaje">El nombre de la tarea es obligatorio</p>) : null}
        </div>
     );
}
 
export default FormTarea;
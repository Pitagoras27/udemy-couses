import React, { useContext, useState, useEffect } from 'react';
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
    const { errortarea, agregarTarea, validarTarea, obtenerTareas, tareaseleccionada, actualizarTarea } = tareaContext;

    useEffect(() => {
        if(tareaseleccionada) {
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada])

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
        if(tareaseleccionada) {
            actualizarTarea(tarea)
        } else {
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea)
            console.log('tarea-->', tarea);
            return;
        }

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
                        value={ !tareaseleccionada ? "Agregar Tarea" : "Editar tarea" }
                    />
                </div>
            </form>
            {errortarea ? (<p className="error mensaje">El nombre de la tarea es obligatorio</p>) : null}
        </div>
     );
}
 
export default FormTarea;
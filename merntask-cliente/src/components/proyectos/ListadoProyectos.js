import React, { useContext, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import alertaContext from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {

    // Extrar proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyectos, mensaje, obtenerProyectos } = proyectosContext;

    const errorsContext = useContext(alertaContext);
    const { alerta, mostrarAlerta } = errorsContext
    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        obtenerProyectos();
    }, [mensaje]);

    // revisar si proyectos tiene contenido
    if(proyectos.length === 0 ) return <p>No hay proyectos, comienza creando uno</p>;
    return (
        <ul className="listado-proyectos">
            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.mensaje}</div>) : null}
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        classNames="tarea"
                        timeout={200}
                        key={proyecto._id}
                    >
                        <Proyecto proyecto={proyecto} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}
export default ListadoProyectos;
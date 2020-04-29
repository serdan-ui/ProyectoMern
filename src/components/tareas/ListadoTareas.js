import React, {useContext} from 'react';
import Tarea from './Tarea'
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import {CSSTransition , TransitionGroup } from 'react-transition-group';


const ListadoTareas = () => {

    //obtner el state de las tareas del proyecto
    const proyectosContext = useContext( proyectoContext)
    const { proyecto, eliminarProyecto } = proyectosContext;


    //obtemer las tareas del context
    const tareasContext = useContext(TareaContext);
    const { tareasProyecto } = tareasContext

    //si no hay proyecto seleccionado 
    if(!proyecto) return <h2>Selelecciona un proyecto</h2>

    //Array destructuring para extraer el proyecto actual

    const [proyectoActual] = proyecto;

    
//Eliminar proyecto
const onClickEliminar = () => {
    eliminarProyecto(proyectoActual._id)
}

    return ( 
        <>
        <h2>Proyecto:{proyectoActual.nombre}</h2>
        
        <ul className="listado-tareas">
            {tareasProyecto.length === 0
            ? (<li className="tarea"><p>No hay tareas</p></li>)
            : <TransitionGroup>
              {  tareasProyecto.map(tarea =>(
               <CSSTransition
               key={tarea._id}
               timeout={200}
               classNames="tarea"
               >
                    <Tarea 
                
                tarea={tarea}
                />
               </CSSTransition>
            ))}
            </TransitionGroup>
            }

            </ul>
            <button 
            type="button"
            className="btn btn-eliminar"
            onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>
           
        </>
     );
}
 
export default ListadoTareas;
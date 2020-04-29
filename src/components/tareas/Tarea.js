import React, {useContext} from 'react';
import TareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ({tarea}) => {

   /// Extraer un proyecto si esta activo
    const proyectosContext = useContext( proyectoContext)
    const { proyecto } = proyectosContext;

 //obtemer la funcion del conec=xt de tarea 
 const tareasContext = useContext(TareaContext);
 const { eliminarTarea , obtenerTareas ,actualizarTarea , guardarTareaActual} = tareasContext;


 //extraer el proyecto
 const [proyectoActual] = proyecto;

 //funcion que se ejecuta cuando el usurario presiona el boton de eliminar tarea 
 const tareaEliminar = id => {
    eliminarTarea(id, proyectoActual._id);
    obtenerTareas(proyectoActual.id)
 }

 //funcion que modifica el estado de las tareas
 const cabiarEstado = tarea => {
    if(tarea.estado){
        tarea.estado = false;

    }else {
        tarea.estado = true;        
    }
    actualizarTarea(tarea);
 }


 //agreaga una tarea Atual cuando el usuario desea editarla
     const seleccionarTarea = tarea => {
         guardarTareaActual(tarea)
     }

    return ( 
        
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {tarea.estado 
                ?  (     
                         <button
                        type="button"
                        className="completo"
                        onClick={() => cabiarEstado(tarea)}
                        >
                        Completo</button>
                        )
                :  (     
                    <button
                   type="button"
                   className="incompleto"
                   onClick={() => cabiarEstado(tarea)}
                   >
                   Incompleto</button>
                   )
                    }

            </div>
            <div className="acciones">
                <button
                type="button"
                className="btn btn-primario"
                onClick={()=> seleccionarTarea(tarea)}
                >Editar</button>

                <button
                type="button"
                className="btn btn-secundario"
                onClick={() => tareaEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;
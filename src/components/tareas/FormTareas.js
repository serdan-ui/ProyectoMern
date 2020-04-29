import React, {useContext, useState , useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {
    

    //Extraer si un proyecto esta acivo
    const proyectosContext = useContext( proyectoContext)
    const { proyecto  } = proyectosContext;


    //obtemer la funcion del conec=xt de tarea 
        const tareasContext = useContext(TareaContext);
        const {tareaSeleccionada, errorTarea , agregarTarea, validarTarea , obtenerTareas ,actualizarTarea , limpiarTarea} = tareasContext;

        //EFEET QUE DETECTA SI HYA UNA TAREA SELECCIONADA 
        useEffect(()=> {
            if(tareaSeleccionada !== null){
                guardarTarea(tareaSeleccionada)
            } else {
                guardarTarea({
                    nombre:""
                })
            }
        },[tareaSeleccionada]);

//State del formulario
const [tarea, guardarTarea] = useState({
    nombre:'',
})

//extraer el nombre del proyecto
const {nombre} = tarea
//si no hay proyecto seleccionado 
if(!proyecto) return null

//Array destructuring para extraer el proyecto actual

const [proyectoActual] = proyecto;

//Leer los valores del formulario 
const handleChange = e =>{
    guardarTarea ({
        ...tarea,
        [e.target.name]: e.target.value
    })
}

const onSubmit = e => {
    e.preventDefault();

    //validar
if(nombre.trim()===''){
    validarTarea();
    return;
}
 
//si es edicion o si es nueva tarea

if(tareaSeleccionada  === null) {
//agregar una nueva tarea al state de tareas
tarea.proyecto = proyectoActual._id;

agregarTarea(tarea)

}else{
    //actualiar tara existente
    
    actualizarTarea(tarea);
    
    //elimina tarea seleccionada del state
    limpiarTarea();
}
    //obtnert y fikltrar las tareas del proyecto actual
    obtenerTareas(proyectoActual.id);

    //REINICAR EL FORM
    guardarTarea({
        nombre:''
    })
}

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                    className="input-text"
                    placeholder="Nombre Tarea..."
                    name="nombre"
                    type="text"
                    onChange={handleChange}
                    value={nombre}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                    type="submit"
                    className="btn btn-primario btn-block"
                    value={tareaSeleccionada ? "Editar Tarea" : "Agregar Tarea"}
                    />
                </div>
            </form>

            {errorTarea ? <p className="mensaje error">el nombre de la tarea es obligatorio</p> : null}
        </div>

     );
}
 
export default FormTarea;
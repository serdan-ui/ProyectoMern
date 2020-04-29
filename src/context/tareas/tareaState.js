import React, { useReducer } from 'react';

import TareaContext from './tareaContext';
import TareaReducer from './tereaReducer';



import { TAREAS_PROYECTOS,
    AGREGAR_TAREAS ,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
  
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA} 
from '../../types/index';

import clienteAxios from '../../config/axios';

const TareaState = props =>{

    const initialState = {
      
        tareasProyecto: [],
        errorTarea:false,
        tareaSeleccionada : null
    }


    //Crear dispacth y state

    const [state , dispacth ] = useReducer(TareaReducer, initialState);

//crear funciones


//obtemer las tareas de un proyecto

const obtenerTareas = async proyecto => {
    console.log(proyecto)
   try {
       const resultado = await clienteAxios.get('/api/tareas', {params:{ proyecto }})
    console.log(resultado)
    dispacth({
        type:TAREAS_PROYECTOS,
        payload: resultado.data.tareas
    })
   } catch (error) {
       console.log(error)
       
   }
}

//AGREAGAR UNA TAREAS AL PROYECTO SELECCIONADO
const agregarTarea = async tarea => {
    console.log(tarea);
    try {
        const resultado = await clienteAxios.post('/api/tareas', tarea);
        console.log(resultado);
        dispacth({
            type: AGREGAR_TAREAS,
            payload: tarea
        })
    } catch (error) {
        console.log(error);
    }
}

//valida y muestra un error en caso de ser nesesario
const validarTarea= ( ) => {
    dispacth({
        type:VALIDAR_TAREA,
    })
}

//ELIMIAR TAREA POR ID
const eliminarTarea = async (id,proyecto) => {
    try {
        await clienteAxios.delete(`/api/tareas/${id}`,{params:{proyecto}})
        dispacth({
            type:ELIMINAR_TAREA,
            payload:id
        })
    } catch (error) {
        console.log(error)
    }
}


// actualizar tareas al editarlas
const actualizarTarea = async tarea => {
    
    try {
        const resultado = await  clienteAxios.put(`/api/tareas/${tarea._id}`,tarea);
        console.log(resultado)
        dispacth({
            type:ACTUALIZAR_TAREA,
            payload:resultado.data.tarea
        })
    } catch (error) {
        console.log(error)
    }
}

//extrae una tarea para edicion
const guardarTareaActual = tarea => {
    dispacth({
        type:TAREA_ACTUAL,
        payload:tarea
    })
}




//Elimina la tareaseleccionada
const limpiarTarea = () => {
    dispacth({
        type:LIMPIAR_TAREA,
        
    })
}

    return (
        <TareaContext.Provider
        value={{
        
            tareasProyecto: state.tareasProyecto,
            errorTarea:state.errorTarea,
            tareaSeleccionada:state.tareaSeleccionada,
            obtenerTareas,
            agregarTarea,
            validarTarea,
            eliminarTarea,
            guardarTareaActual,
            actualizarTarea,
            limpiarTarea
        }}
       >
            {props.children}
        </TareaContext.Provider>
    )


}

export default TareaState;
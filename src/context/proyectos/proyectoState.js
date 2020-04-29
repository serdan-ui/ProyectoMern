import React, { useReducer } from 'react';



import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
}  from '../../types'
import clienteAxios from '../../config/axios'





const ProyectoState = props => {

   
    
    const initialState = {
       
        proyectos:[],

        formulario : false,
        errorformulario:false,
        proyecto:null,
        mensaje:null
    }

    //Dispatch para ejecutar las acciones 
    const [state , dispatch] = useReducer(proyectoReducer , initialState)

    //serei de funciones para el CRUD


    //mostrar el formulario
    const mostrarFormulario = () => {
        dispatch({
            type:FORMULARIO_PROYECTO
        })
    }

    //obtener los proyectos
    const obtenerProyectos = async () => {
            
try {
    const resultado = await clienteAxios.get('/api/proyectos')
    dispatch({
        type:OBTENER_PROYECTOS,
        payload: resultado.data.proyectos
     })

} catch (error) {
    const alerta = {
        msg:'Hubo un error',
        categoria:'alerta-error'
    }
 dispatch({
     type:PROYECTO_ERROR,
     payload:alerta
 }) 
}
        
    }

    //agregar proyecto 
    const agregarProyecto = async proyecto =>{
       try {
           const resultado = await clienteAxios.post('/api/proyectos', proyecto);
           console.log(resultado);
           //insertar el proyecto en el state
           dispatch({
            type:AGREGAR_PROYECTO,
            payload:resultado.data
        })
           
       } catch (error) {
        const alerta = {
            msg:'Hubo un error',
            categoria:'alerta-error'
        }
     dispatch({
         type:PROYECTO_ERROR,
         payload:alerta
     }) 
    }
    }

//VALIDAR FORMULARIO POR ERRORES
const mostrarError = () => {
    dispatch({
        type:VALIDAR_FORMULARIO,
    })
}

//Selecciona el proyecto que elijio el usuario
const proyectoActual = proyectoId => {
    dispatch({
        type:PROYECTO_ACTUAL,
        payload:proyectoId
    })
}

//elimina un proyecto
const eliminarProyecto = async proyectoId => {
    try {
        await clienteAxios.delete(`/api/proyectos/${proyectoId}`)

        dispatch({
            type:ELIMINAR_PROYECTO,
            payload:proyectoId
        })
    } catch (error) {
        const alerta = {
            msg:'Hubo un error',
            categoria:'alerta-error'
        }
     dispatch({
         type:PROYECTO_ERROR,
         payload:alerta
     }) 
    }
}


    return (
        <proyectoContext.Provider
        value={{
            proyectos:state.proyectos,
            formulario: state.formulario,
            errorformulario:state.errorformulario,
            proyecto:state.proyecto,
            mensaje:state.mensaje,
            mostrarFormulario,
            obtenerProyectos,
            agregarProyecto,
            mostrarError,
            proyectoActual,
            eliminarProyecto
        }}>
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;
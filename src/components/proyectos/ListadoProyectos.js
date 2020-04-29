import React, {useContext ,useEffect} from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import  alertaContext  from '../../context/alertas/alertaContext'


const ListadoProyectos = () => {

    const proyectosContext= useContext(proyectoContext)

    const {mensaje, proyectos ,obtenerProyectos } =proyectosContext;

    const AlertaContext= useContext(alertaContext);
    const { alerta ,mostrarAlerta } =AlertaContext

    //una vez que cargue el componente se ejecuta para obtener los proyectos
    useEffect(()=>{

        if (mensaje) {
            mostrarAlerta(mensaje.msg , mensaje.categoria)
        }
        obtenerProyectos();

        //eslint-disable-next-line
    },[mensaje]);

    //revisar si hay contenido
    if(proyectos.length === 0) return <p>No hay proyectos</p>
        
    return ( 

        <ul className="listado-proyecto">

            {alerta ?(<div className={`alerta ${alerta.categoria}`} >{alerta.msg} </div>)  : null}

            <TransitionGroup>
            {proyectos.map(proyecto => (
                <CSSTransition
                key={proyecto._id}
                classNames="proyecto"
                timeout={200}
                >
                    <Proyecto
                
                proyecto={proyecto}
                />
                </CSSTransition>
            ))}
            </TransitionGroup>
           
        </ul>
     );
}
 
export default ListadoProyectos;
import React ,{useContext, useEffect} from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTareas';
import ListadoTares from '../tareas/ListadoTareas';
import AuthContext from '../../context/authentication/authContext'

const Proyectos = () => {

//Extraer la informacion de autenticacion
const authContext = useContext(AuthContext);
const {usuarioAutenticado} = authContext;

useEffect(() => {
    usuarioAutenticado();

    // eslint-disable-next-line
},[])

    return ( 
    <div className="contenedor-app">
        <Sidebar />
        <div className="seccion-principal">

            <Barra/>

            <main>
                    <FormTarea />
                <div className="contenedor-tareas">
                    <ListadoTares />
                </div>
            </main>
        </div>
    </div>
    );
}
 
export default Proyectos;
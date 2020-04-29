import React from 'react';
import NuevoProyecto from '../proyectos/NuevoProyecto';
import ListadoProyecto from '../proyectos/ListadoProyectos';

const Sidebar = () => {


    return ( 
        <aside>
            <h1>Mern<span>Tasks</span></h1>
            <NuevoProyecto />

            <div className="proyectos">

                <h2>Tus proyectos</h2>
                
                <ListadoProyecto />
            </div>
        </aside>
     );
}
 
export default Sidebar;
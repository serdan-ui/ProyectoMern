import React ,{ useState ,useContext , useEffect }from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/authentication/authContext';


const NuevaCuenta = (props) => {
    
    // extraer los valores del context
    const alertaContext = useContext(AlertContext);
    const {alerta ,mostrarAlerta} = alertaContext;

const authContext = useContext(AuthContext);
const { mensaje, autenticado, registrarUsuario } =authContext;


//EN CASO DE QUE EL USUARIO SE HAYA AUTENTIFICADO O REGISTRADO 0 SEA UN REGISTRO EXITOSO

useEffect(()=>{
if(autenticado) {
    props.history.push('/proyectos');
}


if(mensaje){
    mostrarAlerta( mensaje.msg , mensaje.categoria )
}

// eslint-disable-next-line
}, [ mensaje, autenticado,props.history])


    //Sate para iniciar sesion
    const [usuario, guardarUsuario ] = useState({
        nombre:"",
        email:"",
        password:"",
        confirmar:""
    });

//Extraer el usuario
const {nombre, email , password , confirmar } = usuario; 

    const onChange = e => {
        guardarUsuario ({
            ...usuario,
          [e.target.name]: e.target.value  
        })
    }

    // cuando el usuario quiera iniciar sesion
    const onSubmit = e => {
        e.preventDefault();

        //validar que no haya campos vacios
if ( nombre.trim() ==='' ||
email.trim() ===''||
password.trim() ===''||
confirmar.trim() ==='' ){

    mostrarAlerta('todos los campos son obligatorios', 'alerta-error' );
    return;
}
        //password minimo de 6 cararteres
    if(password.length< 6){
        mostrarAlerta('el password debe ser de al menos 6 caracteres','alerta-error');
        return;
    }
        //los 2 password sean iguales
        if(password !== confirmar){
            mostrarAlerta('los 2 password deben ser iguales' ,'alerta-error');
            return;
        }
        //Pasarlo al action
        registrarUsuario({nombre,email,password});

    }

    return ( 
    <div className="form-usuario">
        {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
        <div className="contenedor-form sombra-dark">
            <h1>Obtener una Cuenta</h1>

            <form 
            onSubmit={onSubmit}
             >
                <div className="campo-form">
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Tu Nombre"
                    value={nombre}
                    onChange={onChange}
                    />
                </div>
                <div className="campo-form">
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Tu Email"
                    value={email}
                    onChange={onChange}
                    />
                </div>
                <div className="campo-form">
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Tu Password"
                    value={password}
                    onChange={onChange}
                    />
                </div>
                <div className="campo-form">
                    <label htmlFor="confirmar">Confirmar Password</label>
                    <input 
                    type="password"
                    id="confirmar"
                    name="confirmar"
                    placeholder="Repite tu passwprd"
                    value={confirmar}
                    onChange={onChange}
                    />
                </div>
                <div className="campo-form">
                    <input type="submit" className="btn btn-primario btn-block"
                    value="Registrarme"
                    />
                </div>
            </form>
            <Link to={'/'} className="enlace-cuenta">
                Volver a Iniciar Sesion
            </Link>
        </div>
    </div>
    );
}
 
export default NuevaCuenta;
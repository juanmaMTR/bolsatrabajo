import {useRef} from "react";
import ErrorForms from "../componentesBasicos/ErrorForms";
import Service from "../componentesBasicos/Service"
import ServiceJWT from "../componentesBasicos/ServiceJWT"


const Login  = () => {    

    const inputUsuario = useRef(null)
    const inputContrasenia = useRef(null)

    const handleSubmit = async event => {
        event.preventDefault()

        const parametros = {
            method: 'POST',
            // url: '../src/php/controller/controller.php',
            url: '../src/php/authentication/autentificacion.php',
            inputs : {
                inputUsuario : inputUsuario.current.value,
                inputContrasenia: inputContrasenia.current.value
            }
        }

        ServiceJWT(parametros)        

    }
    return(
        <main>
            <h1>Login</h1>
            <form action="#" method="POST" onSubmit={handleSubmit}>
                <label>Usuario</label><br/>
                <input type="text" name="nombre" placeholder="Introduzca el usuario" ref={inputUsuario}/><br/>
                <label>Contraseña</label><br/>
                <input type="password" name="contrasenia" placeholder="Introduzca la contraseña" ref={inputContrasenia}/><br/>
                <input type="submit" value="Acceder" name="Login"/>
            </form>
        </main>
    )
        
    
}
export default Login 
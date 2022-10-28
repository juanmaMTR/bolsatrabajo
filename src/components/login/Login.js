import {useRef} from "react";
import Service from "../componentesBasicos/Service"
import ServiceJWT from "../componentesBasicos/ServiceJWT"
import DecodeCookie from '../componentesBasicos/DecodeCookie'
import Auth from "../componentesBasicos/Auth"


const Login  = () => {    

    console.log(DecodeCookie())  

    const inputUsuario = useRef(null)
    const inputContrasenia = useRef(null)

    const handleSubmit = async (event) => {
        event.preventDefault()

        const parametros = {
            method: 'POST',
            url: '../src/php/index.php',
            inputs : {
                accion: 'login',
                inputUsuario : inputUsuario.current.value,
                inputContrasenia: inputContrasenia.current.value
            }
        }

        Auth(parametros)   
        //Recarga la página     
        //window.location.reload()
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
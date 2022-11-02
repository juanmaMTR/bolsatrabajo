import '../../css/login.css'
import {useRef} from "react";
import Service from "../componentesBasicos/Service"
import DecodeCookie from '../componentesBasicos/DecodeCookie'


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

        Service(parametros)   
        //Recarga la página     
        //window.location.reload()
    }
    return(
        <div class="container">
            <form action="#" method="POST" onSubmit={handleSubmit}>
                <p>Login</p>
                <input type="text" name="nombre" placeholder="Usuario" ref={inputUsuario}/><br/>
                <input type="password" name="contrasenia" placeholder="Contraseña" ref={inputContrasenia}/><br/>
                <input type="submit" value="Acceder" name="Login"/><br/>
                <a href="">¿Olvidó la contraseña?</a>
            </form>

            <div class="drops">
                <div class="drop drop-1"></div>
                <div class="drop drop-2"></div>
                <div class="drop drop-3"></div>
                <div class="drop drop-4"></div>
                <div class="drop drop-5"></div>
            </div>
        </div>
    )
        
    
}
export default Login 
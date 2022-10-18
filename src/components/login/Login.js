import React, {useRef} from "react";
import ErrorForms from "../componentesBasicos/ErrorForms";


const Login  = () => {   
    

    const inputUsuario = useRef(null)
    const inputContrasenia = useRef(null)

    const handleSubmit = async event => {
        event.preventDefault()
        
        const datosPeticion = {
            titulo: 'Datos formulario login', 
            usuario: inputUsuario.current.value, 
            contrasenia: inputContrasenia.current.value
        }
        const opcionesPeticion = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datosPeticion)
        }
        fetch('/php/controller/controller.php', opcionesPeticion)
           .then(response => response.json())

        console.log(inputUsuario.current.value);
        console.log(inputContrasenia.current.value);
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
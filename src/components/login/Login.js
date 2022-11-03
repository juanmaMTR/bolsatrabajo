import '../../css/login.css'
import {useRef, useState, useEffect} from "react";
import Service from "../componentesBasicos/Service"
import Auth from '../componentesBasicos/Auth';
import DecodeCookie from '../componentesBasicos/DecodeCookie';

const Login  = () => {
        
    const inputUsuario = useRef(null)
    const inputContrasenia = useRef(null)
    const [texto, setTexto] = useState(0);
    // para ignorar el callback durante el primer render del componente
    // const didMount = useRef(false);
    
    // useEffect(()=>{
    //     // para ignorar el callback durante el primer render del componente
    //     // if (!didMount.current ) {
    //     //     return didMount.current = true;
    //     // }
    //     const responseJson = Auth()
    //     const respuestaTexto = responseJson.Respuesta
    //     console.log(respuestaTexto)

    //     let datos = {
    //         userName : '',
    //         type : '',
    //         message : respuestaTexto
    //     }
    //     if (respuestaTexto == 'OK') {
    //         const datosCookie = DecodeCookie()
    //         datos = {
    //             userName : datosCookie.userName,
    //             type : datosCookie.type,
    //             message : respuestaTexto
    //         }
    //         console.log(datos);
    //         setTexto(datos)
    //     }else{
    //         setTexto(datos)
    //     }
    // }, [texto])
    const actualizarTexto = async () => {
        // para ignorar el callback durante el primer render del componente
        // if (!didMount.current ) {
        //     return didMount.current = true;
        // }
        const responseJson = await Auth()
        const respuestaTexto = responseJson.Respuesta
        console.log(respuestaTexto)

        let datos = {
            userName : '',
            type : '',
            message : respuestaTexto
        }
        if (respuestaTexto == 'OK') {
            const datosCookie = DecodeCookie()
            datos = {
                userName : datosCookie.userName,
                type : datosCookie.type,
                message : respuestaTexto
            }
            console.log(datos);
            setTexto(datos)
        }else{
            setTexto(datos)
        }
        
    }
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
        

        actualizarTexto()
        Service(parametros)   
        //Recarga la página     
        //window.location.reload()
    }
    return(
        <div className="container">
            <p>Usuario: {texto.userName}</p>
            <p>Tipo: {texto.type}</p>
            <p>{texto.message}</p>
            <form action="#" method="POST" onSubmit={handleSubmit}>
                <p>Login</p>
                <input type="text" name="nombre" placeholder="Usuario" ref={inputUsuario}/><br/>
                <input type="password" name="contrasenia" placeholder="Contraseña" ref={inputContrasenia}/><br/>
                <input type="submit" value="Acceder" name="Login"/><br/>
                <a href="">¿Olvidó la contraseña?</a>
            </form>

            <div className="drops">
                <div className="drop drop-1"></div>
                <div className="drop drop-2"></div>
                <div className="drop drop-3"></div>
                <div className="drop drop-4"></div>
                <div className="drop drop-5"></div>
            </div>
        </div>
    )
        
    
}
export default Login 
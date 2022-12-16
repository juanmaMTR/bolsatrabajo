import {useRef, useState, useEffect, useCallback} from "react";
import Service from "../componentesBasicos/Service"
import Auth from '../componentesBasicos/Auth';
import DecodeCookie from '../componentesBasicos/DecodeCookie';

const Login  = () => {
        
    const inputUsuario = useRef(null)
    const inputContrasenia = useRef(null)
    const [texto, setTexto] = useState(0);
    const [respuesta, setRespuesta] = useState(null)    
    useEffect(() =>{
        actualizarTexto()
    }, [])

    

    const actualizarTexto = useCallback( async () =>{
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
    }, [texto])

    if(texto.message == 'OK'){
        window.location.href = "/21/"
    }  
        
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        
        const parametros = {
            method: 'POST',
            inputs : {
                accion: 'login',
                inputUsuario : inputUsuario.current.value,
                inputContrasenia: inputContrasenia.current.value
            }
        }
        

        const response = await Service(parametros)
        const responseJson = await response.json()
        console.log(responseJson);
        
        if(responseJson.resultado == "Sesión iniciada."){
            setRespuesta(
                <div class="flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                    <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <div>
                        <span class="font-medium">{responseJson.resultado}👍</span>
                    </div>
                </div>
            )
        }else{
            setRespuesta(
                <div class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                    <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <div>
                        <span class="font-medium">{responseJson.resultado}😢</span>
                    </div>
                </div>
            )
        }
        
        //Se puede bajar el tiempo para que sea más rápida la actualización del texto
        setTimeout(() => {
            actualizarTexto()
        }, 150);
    }
    return(
        <div class="bg-gray-200 bg-opacity-50 flex justify-center items-center min-h-screen">
            <div class="w-full max-w-xs h-768px flex justify-center flex-col">
                <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Login</h1>
                <form action="#" method="POST" onSubmit={handleSubmit} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-left">
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Usuario</label>
                        <input type="text" name="nombre" placeholder="Usuario" ref={inputUsuario} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input type="password" name="contrasenia" placeholder="Contraseña" ref={inputContrasenia} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                    </div>
                    <div class="flex items-center justify-between">
                        <input type="submit" value="Acceder" name="Login" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"/><br/>
                        <a href="" class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker">¿Olvidó la contraseña?</a>
                    </div>
                </form>
                {respuesta}
            </div>
        </div>
    )
    
}
export default Login 
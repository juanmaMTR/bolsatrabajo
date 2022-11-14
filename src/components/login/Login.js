import {useRef, useState, useEffect, useCallback} from "react";
import Service from "../componentesBasicos/Service"
import Auth from '../componentesBasicos/Auth';
import DecodeCookie from '../componentesBasicos/DecodeCookie';

const Login  = () => {
        
    const inputUsuario = useRef(null)
    const inputContrasenia = useRef(null)
    const [texto, setTexto] = useState(0);
    
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
        

        Service(parametros)
        
        
        //Se puede bajar el tiempo para que sea más rápida la actualización del texto
        setTimeout(() => {
            actualizarTexto()
        }, 100);
    }
    return(
        <div class="bg-gray-200 bg-opacity-50 flex justify-center items-center">
            <div class="w-full max-w-xs h-768px">
                <p>Usuario: {texto.userName}</p>
                <p>Tipo: {texto.type}</p>
                <p>Mensaje: {texto.message}</p>
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

                <div className="drops">
                    <div className="drop drop-1"></div>
                    <div className="drop drop-2"></div>
                    <div className="drop drop-3"></div>
                    <div className="drop drop-4"></div>
                    <div className="drop drop-5"></div>
                </div>
            </div>
        </div>
    )
        
    
}
export default Login 
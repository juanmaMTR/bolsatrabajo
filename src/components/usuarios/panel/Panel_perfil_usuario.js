import React, {useState,useEffect} from "react";
import Service from "../../componentesBasicos/Service";
import Editar_perfil_usuario from "./Editar_perfil_usuario";

/**
 * @file Panel_perfil_usuario.js
 * @description Perfil del usuario
 * @param {object} inicioSesion Datos necesarios para obtener el perfil del usuario
 * @returns 
 */
const Panel_perfil_usuario = ({inicioSesion}) => {
    const [estadoUsuario, setEstadoUsuario] = useState('no trabajando')
    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [datosUsuario, setDatosUsuario] = useState([])

    useEffect(() => {
        obtenerDatosUsuario()
    },[])

    const obtenerDatosUsuario = async () => {
        const parametros = {
            method: 'POST',
            inputs: {
                accion: 'listarUsuario',
                nombre: inicioSesion.userName,
            }
        }
        const response = await Service(parametros)
        const datosResponse = await response.json();
        setDatosUsuario(datosResponse)
    }

    const selectorEstadoUsuario = () => {
        if(datosUsuario.estado == 0){
            setEstadoUsuario('no trabajando')
        }else if(datosUsuario.estado == 1){
            setEstadoUsuario('trabajando')
        }
    }
    setTimeout(() => {
        selectorEstadoUsuario()
    }, 200);

    return (
        <div className="container mx-auto">
            <div className="flex flex-col md:flex-row h-min w-full">
                <div className="bg-white md:bg-gray-100 h-16 md:h-20 w-full flex flex-row items-center justify-between px-3 rounded-b-lg">
                    <div className="flex flex-row items-center space-x-3">
                        <h1 className="text-lg font-semibold text-gray-700">
                            Bienvenido a tu perfil <span className="font-bold">{datosUsuario.nombreUsuario}</span>
                        </h1>
                    </div>
                </div>
            </div>
            <div className="mt-48 mb-6 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white">
                <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                        <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                            <div className="relative">
                                <div className="-mt-20 w-40">
                                    <img src="https://raw.githubusercontent.com/juanmaMTR/bolsatrabajo/jdBranch/src/assets/imgs/LogoVirgendeGuadalupe.png" alt="Profile picture" className="inline-block relative object-cover object-center !rounded-full rounded-lg h-full w-full shadow-xl" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center"></div>
                        <div className="w-full px-4 lg:order-1 lg:w-4/12"></div>
                    </div>
                    <div className="my-8 text-center">
                        <h2 className="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-blue-gray-900 mb-2">{datosUsuario.nombreUsuario}</h2>
                        <div className="mb-16 flex items-center justify-center gap-2">
                            <p className="block antialiased font-sans text-base leading-relaxed font-medium text-blue-gray-700">{datosUsuario.nombre + " " + datosUsuario.apellidos}</p>
                        </div>
                        <div className="mb-2 flex items-center justify-center gap-2">
                            <img className="-mt-px h-4 w-4 text-blue-gray-700" src="https://raw.githubusercontent.com/juanmaMTR/bolsatrabajo/jmtrBranch/src/assets/imgs/mail.png"/>
                            <p className="block antialiased font-sans text-base leading-relaxed font-medium text-blue-gray-700">{datosUsuario.correo}</p>
                        </div>
                    </div>
                    <div className="mb-10 border-t border-blue-gray-50 py-6 text-center">
                        <div className="mt-2 flex flex-wrap justify-center">
                            <div className="flex w-full flex-col items-center px-4 lg:w-9/12">
                                <p className="block antialiased font-sans text-base leading-relaxed mb-8 font-normal text-blue-gray-500">
                                    Hola {datosUsuario.nombre + " " + datosUsuario.apellidos}, bienvenido a tu perfil. Su DNI es {datosUsuario.dni} y su estado actual es {estadoUsuario}.
                                </p>
                                <button className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-blue-500 hover:bg-blue-500/10 active:bg-blue-500/30" type="button" style={{position: "relative", overflow: "hidden"}} onClick={()=>{setMostrarEditar(true)}}>Editar Perfil</button>
                            </div>
                        </div>
                    </div>
                </div>
                {mostrarEditar && <Editar_perfil_usuario mostrarEditar={setMostrarEditar} usuario={datosUsuario}/>}
            </div>
        </div>
    )
}

export default Panel_perfil_usuario
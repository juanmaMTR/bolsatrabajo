import React, { useEffect, useState } from "react";
import Service from "../componentesBasicos/Service";

/**
 * @file src/components/usuarios/Panel_usuario.js
 * @brief Componente para mostrar el panel de usuario
 */
const Panel_usuario = ({inicioSesion}) => {
    const [datosUsuario, setDatosUsuario] = useState([])
    const [tipoUsuario, setTipoUsuario] = useState('alumno')
    const [estadoUsuario, setEstadoUsuario] = useState('no trabajando')

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

    const selectorTipoUsuario = () => {
        if(datosUsuario.tipo == 's'){
            setTipoUsuario('Administrador')
        }else if(datosUsuario.tipo == 't'){
            setTipoUsuario('Tutor')
        }else if(datosUsuario.tipo == 'a'){
            setTipoUsuario('Alumno')
        }
    }
    const selectorEstadoUsuario = () => {
        if(datosUsuario.estado == 0){
            setEstadoUsuario('no trabajando')
        }else if(datosUsuario.estado == 1){
            setEstadoUsuario('trabajando')
        }
    }
    setTimeout(() => {
        selectorTipoUsuario()
        selectorEstadoUsuario()
    }, 200);
    
    return(
        <div className="font-poppins antialiased">
            <div
            id="view"
            className="h-full w-screen flex flex-row"
            x-data="{ sidenav: true }"
            >
                <button className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden">
                    <svg
                    className="w-5 h-5 fill-current"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        fill-rule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                    ></path>
                    </svg>
                </button>
                <div
                    id="sidebar"
                    className="bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
                    x-show="sidenav"
                >
                    <div className="space-y-6 md:space-y-10 mt-10">
                        <div id="profile" className="space-y-3">
                            <img
                            src="https://raw.githubusercontent.com/juanmaMTR/bolsatrabajo/jdBranch/src/assets/imgs/LogoVirgendeGuadalupe.png"
                            alt="Avatar user"
                            className="w-10 md:w-16 rounded-full mx-auto"
                            />
                            <div>
                            <h2
                                className="font-medium text-xs md:text-sm text-center text-teal-500"
                            >
                                {datosUsuario.nombreUsuario}
                            </h2>
                            <p className="text-xs text-gray-500 text-center">{tipoUsuario}</p>
                            </div>
                        </div>
                        <div id="menu" className="flex flex-col space-y-2">
                            <a
                            href=""
                            className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
                            >
                            <svg
                                className="w-6 h-6 fill-current inline-block"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                ></path>
                            </svg>
                            <span className="">Perfil</span>
                            </a>
                            <a
                            href=""
                            className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                            >
                            <svg
                                className="w-6 h-6 fill-current inline-block"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                <path
                                fill-rule="evenodd"
                                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                clip-rule="evenodd"
                                ></path>
                            </svg>
                            <span className="">Gestión de curriculums</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row h-screen w-full">
                        <div className="bg-white md:bg-gray-100 h-16 md:h-20 w-full flex flex-row items-center justify-between px-3 rounded-b-lg">
                            <div className="flex flex-row items-center space-x-3">
                                <h1 className="text-lg font-semibold text-gray-700">
                                    Bienvenido a tu perfil <span className="font-bold">{datosUsuario.nombreUsuario}</span>
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="relative mb-6 -mt-64 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
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
                                            <button className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-blue-500 hover:bg-blue-500/10 active:bg-blue-500/30" type="button" style={{position: "relative", overflow: "hidden"}}>Show more</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Panel_usuario
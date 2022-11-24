import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Service from "../componentesBasicos/Service";
import Panel_perfil_usuario from "./panel/Panel_perfil_usuario";

/**
 * @file src/components/usuarios/Panel_usuario.js
 * @brief Componente para mostrar el panel de usuario
 */
const Panel_usuario = ({inicioSesion}) => {
    const [datosUsuario, setDatosUsuario] = useState([])
    const [tipoUsuario, setTipoUsuario] = useState('alumno')

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

    setTimeout(() => {
        selectorTipoUsuario()
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
                    className="bg-white md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
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
                            <Link
                            to="/21/panel_u/perfil"
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
                            </Link>
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
                <Routes>
                    <Route path=":perfil" element={<Panel_perfil_usuario datosUsuario={datosUsuario}/>} />
                </Routes>
            </div>
        </div>
    )
}

export default Panel_usuario
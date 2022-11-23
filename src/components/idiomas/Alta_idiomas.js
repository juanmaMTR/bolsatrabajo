import React, {useEffect, useState} from "react";
import Service from "../componentesBasicos/Service";

/**
 * @file src/components/idiomas/Alta_idiomas.js
 * @brief Componente para dar de alta un idioma
 * @returns mixed
 */
const Alta_idiomas = () => {
    const [optionsIdiomas, setOptionsIdiomas] = useState([])
    const [state, setState] = useState({
        errors: {},
        idioma: "Abkhaz",
        certificacion: "Ninguna",
        nivelOral: "0",
        nivelEscrito: "0",
        nivelEscucha: "0",
    });
    const [respuesta, setRespuesta] = useState(false);

    useEffect(() => {
        ObtenerIdiomas()
    },[])

    const ObtenerIdiomas = async () => {
        const options = []
        const url = "/21/php/idiomas/idiomas.json"
        const opcionesPeticion = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }
        const response = await fetch(url, opcionesPeticion)
        const datosIdiomas = await response.json();
        datosIdiomas.forEach(idioma => {
            options.push(<option value={idioma.name}>{idioma.name}</option>)
        });
        setOptionsIdiomas(options)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const parametros = {
            method: 'POST',
            inputs: {
                accion: 'altaIdiomas',
                idioma: state.idioma,
                certificacion: state.certificacion,
                nivelOral: state.nivelOral,
                nivelEscrito: state.nivelEscrito,
                nivelEscucha: state.nivelEscucha,
            }
        }
        const response = await Service(parametros)
        const datosResponse = await response.json();
        if(datosResponse == "Idioma dado de alta correctamente."){
            setRespuesta(
                <div class="flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                    <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Info</span>
                    <div>
                        <span class="font-medium">Idioma dado de alta correctamente!👍</span>
                    </div>
                </div>
            )
        }else{
            setRespuesta(
                <div class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                    <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Info</span>
                    <div>
                        <span class="font-medium">Ha ocurrido un error!😢</span>
                    </div>
                </div>
            )
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setState({
            ...state,
            [name]: value,
        })
    }
    return(
        <div className="bg-gray-200 bg-opacity-50 flex justify-center items-center">
            <div className="w-full max-w-xs h-768px flex justify-center flex-col">
                <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Alta de Idiomas</h1>
                <form action="#" method="POST" onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-left">
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Idioma: </label>
                        <select name="idioma" onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:ring-blue-200 focus:border-blue-300">
                            {optionsIdiomas}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Certificación: </label>
                        <select name="certificacion" onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:ring-blue-200 focus:border-blue-300">
                            <option value="Ninguna" selected>Ninguna</option>
                            <option value="A1">A1</option>
                            <option value="A2">A2</option>
                            <option value="B1">B1</option>
                            <option value="B2">B2</option>
                            <option value="C1">C1</option>
                            <option value="C2">C2</option>
                            <option value="Nativo">Nativo</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nivel Oral: </label>
                        <select name="nivelOral" onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:ring-blue-200 focus:border-blue-300">
                            <option value="0" selected>Bajo</option>
                            <option value="1">Medio</option>
                            <option value="2">Alto</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nivel Escrito: </label>
                        <select name="nivelEscrito" onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:ring-blue-200 focus:border-blue-300">
                            <option value="0" selected>Bajo</option>
                            <option value="1">Medio</option>
                            <option value="2">Alto</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nivel Escucha: </label>
                        <select name="nivelEscucha" onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:ring-blue-200 focus:border-blue-300">
                            <option value="0" selected>Bajo</option>
                            <option value="1">Medio</option>
                            <option value="2">Alto</option>
                        </select>
                    </div>
                    <div class="flex items-center justify-between">
                        <input type="submit" value="Añadir" name="enviar" class="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"/>
                        <button onClick={() => {window.location.href = "/21/"}} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancelar</button>
                    </div>
                </form>
                {respuesta}
            </div>
        </div>
    )
}

export default Alta_idiomas;
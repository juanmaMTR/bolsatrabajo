import React, { useEffect,useRef,useState } from 'react';
import Service from '../componentesBasicos/Service';
import ErrorForms from '../componentesBasicos/ErrorForms';

const validarCiclos = values => {
    const errors = {}
    if (!values.nombre) {
        errors.nombre = '*El nombre es obligatorio'
    }else{
        if(values.nombre == null || values.nombre.includes(" ")){
            errors.nombre = "*Este campo no puede estar vacío o incluir caracteres en blanco"
        }
        if(values.nombre.length > 100){
            errors.nombre = '*El nombre debe tener menos de 100 caracteres'
        }
    }
    return errors
}

const Alta_ciclos = () => {
    const [familias, setFamilias] = useState([]);
    const inputNombre = useRef(null);
    const inputFamilia = useRef(null);
    const [state, setState] =useState({
        errors: {}
    })
    const errors = state.errors
    const [respuesta, setRespuesta] = useState(false);

    useEffect(() => {
        ObtenerFamiliasProfesionales()
    }, [])

    const ObtenerFamiliasProfesionales = async() => {
        const parametros ={
            method: 'POST',
            inputs: {
                accion: 'listadoFamiliasProfesionales',
            }
        }
        const response = await Service(parametros)
        const datosFamilias = await response.json();
        setFamilias(datosFamilias)
    }
    const handleSubmit= async (event) => {
        event.preventDefault()
        const { errors, ...sinErrors}=state
        const result = validarCiclos(sinErrors)

        setState({errors:result})
        if(!Object.keys(result).length) {
            console.log('envio el formulario');
            console.log(state);
            const parametros = {
                method: 'POST',
                inputs: {
                    accion: 'altaCiclos',
                    nombre: state.nombre,
                    familiaProfesional: state.familiaProfesional,
                }
            }
            const response = await Service(parametros)
            const datosResponse = await response.json();
            if(datosResponse == "Ciclo dado de alta."){
                setRespuesta(
                    <div class="flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                        <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Info</span>
                        <div>
                            <span class="font-medium">Ciclo dado de alta correctamente!👍</span>
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
    }
    const handleChange = () => {
        setState({
            ...state,
            [inputNombre.current.name]: inputNombre.current.value,
            [inputFamilia.current.name]: inputFamilia.current.value
        })
    }
    return(
        <div className="bg-gray-200 bg-opacity-50 flex justify-center items-center">
            <div className="w-full max-w-xs h-768px flex justify-center flex-col">
                <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Alta de Ciclos</h1>
                <form action="#" method="POST" onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-left">
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre: </label>
                        <input type="text" name="nombre" placeholder="nombre" onChange={handleChange} ref={inputNombre} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                        {errors.nombre && <ErrorForms message={errors.nombre}/>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Familia Profesional: </label>
                        <select name="familiaProfesional" onChange={handleChange} ref={inputFamilia} className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:ring-blue-200 focus:border-blue-300">
                            {familias.map((familia) => (
                                <option value={familia.id}>{familia.nombre}</option>
                            ))}
                        </select><br/>
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

export default Alta_ciclos;
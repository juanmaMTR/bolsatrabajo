import React, {useRef,useState} from "react";
import Service from "../componentesBasicos/Service";
import ErrorForms from "../componentesBasicos/ErrorForms";

const validarCiclos = values => {
    const errors = {}
    if (!values.nombre) {
        errors.nombre = '*El nombre es obligatorio'
    }else{
        if(values.nombre == null || values.nombre.includes(" ") || values.nombre == ""){
            errors.nombre = "*Este campo no puede estar vacío o incluir caracteres en blanco"
        }
        if(values.nombre.length > 100){
            errors.nombre = '*El nombre debe tener menos de 100 caracteres'
        }
    }
    return errors
}

const EditarCiclos = ({mostrar,ciclo,familias}) => {
    const options=[];
    const [inputNombre, setInputNombre] = useState(ciclo.nombreCiclo);
    const [inputFamilia, setInputFamilia] = useState(ciclo.idFamilia);
    const iNombre = useRef(null);
    const iFamilia = useRef(null);
    const [state, setState] =useState({
        errors: {}
    })
    const errors = state.errors
    const [respuesta, setRespuesta] = useState(false);

    const seleccionarFamilia = () => {
        familias.map((familia) => {
            if(familia.id == ciclo.idFamilia){
                options.push(<option selected value={familia.id}>{familia.nombre}</option>)
            }else{
                options.push(<option value={familia.id}>{familia.nombre}</option>)
            }
        })
    }
    seleccionarFamilia();
    
    const handleSubmit = async (event) =>{
        event.preventDefault()
        console.log(state);
        const { errors, ...sinErrors}=state
        const result = validarCiclos(sinErrors)

        setState({errors:result})
        if(!Object.keys(result).length) {
            console.log('envio el formulario');
            const parametros = {
                method: 'POST',
                inputs: {
                    accion: 'editarCiclo',
                    nombreAnterior: ciclo.nombreCiclo,
                    nombre: state.nombre,
                    familiaProfesional: state.familiaProfesional,
                }
            }
            const response = await Service(parametros)
            const datosResponse = await response.json();
            if(datosResponse == "Ciclo editado correctamente."){
                setRespuesta(
                    <div class="flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                        <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Info</span>
                        <div>
                            <span class="font-medium">Ciclo editado correctamente!👍</span>
                        </div>
                    </div>
                )
                window.location.reload();
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
            [iNombre.current.name]: iNombre.current.value,
            [iFamilia.current.name]: iFamilia.current.value
        })
    }

    return (
        <div>
            <div className="py-12 bg-gray-700 bg-opacity-50 flex justify-center items-center transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <form action="#" method="POST" onSubmit={handleSubmit} className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400 text-left">
                        <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4 text-center">Editar ciclo {ciclo.nombreCiclo}</h1>
                        <label for="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Ciclo:</label>
                        <input id="name" onChange={event => {setInputNombre(event.target.value);handleChange()}} ref={iNombre} name="nombre" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-blue-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" value={inputNombre} />
                        {errors.nombre && <ErrorForms message={errors.nombre}/>}
                        <label for="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Familia Profesional:</label>
                        <div className="flex justify-center">
                            <div className="mb-3 w-full">
                                <select onChange={event => {setInputFamilia(event.target.value);handleChange()}} ref={iFamilia} name="familiaProfesional" className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding -no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-300 focus:outline-none leading-tight focus:ring-blue-200" aria-label="Default select example">
                                    {options.map((option) => (option))}
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Enviar</button>
                            <button onClick={()=>{mostrar(false);}} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancelar</button>
                        </div>
                        <button onClick={()=>{mostrar(false)}}  className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-sky-200 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" aria-label="close modal" role="button">
                            <svg  xmlns="http://www.w3.org/2000/svg"  className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </form>
                    {respuesta}
                </div>
            </div>
        </div>
    )
}
export default EditarCiclos;
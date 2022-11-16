import React, {useState,useEffect} from "react";
import Service from "../componentesBasicos/Service";

const EditarCiclos = ({mostrar,ciclo}) => {
    const [familias, setFamilias] = useState([]);
    const [opstionsFamilias, setOptionsFamilias] = useState([]);
    
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
        setTimeout(()=>{
            seleccionarFamilia()

        },200)
    }
    const seleccionarFamilia = () => {
        familias.map((familia) => {
            //console.log(familia.id, ciclo.idFamilia);

            if(familia.id == ciclo.idFamilia){
                setOptionsFamilias(<option selected value={familia.id}>{familia.nombre}</option>)
            }else{
                setOptionsFamilias(<option value={familia.id}>{familia.nombre}</option>)
            }
        })
    }
    const peticionEditar = () =>{
         
    }
    return (
        <div>
            <div className="py-12 bg-gray-700 bg-opacity-50 flex justify-center items-center transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Editar usuario {ciclo.nombreCiclo}</h1>
                        <label for="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Ciclo:</label>
                        <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" value={ciclo.nombreCiclo} />
                        
                        <label for="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Familia Profesional:</label>
                        <div className="flex justify-center">
                            <div className="mb-3 w-full">
                                <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding -no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                    {opstionsFamilias.map((option) => (option))}
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center justify-start w-full">
                            <button onClick={()=>{mostrar(false); peticionEditar()}} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">Enviar</button>
                            <button onClick={()=>{mostrar(false)}} className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">Cancelar</button>
                        </div>
                        <button onClick={()=>{mostrar(false)}}  className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-sky-200 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" aria-label="close modal" role="button">
                            <svg  xmlns="http://www.w3.org/2000/svg"  className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditarCiclos;
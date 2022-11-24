import React,{useState,useEffect} from "react";
import Service from "../componentesBasicos/Service";
import EditarCiclos from "./Editar_ciclos";
import BorrarCiclos from "./Borrar_ciclos";

const Listado_ciclos = () => {
    const [lista, setLista] = useState([]);
    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [mostrarBorrar, setMostrarBorrar] = useState(false);
    const [cicloBorrar, setCicloBorrar] = useState(false)
    const [cicloEditar, setCicloEditar] = useState(false)
    const [familias, setFamilias] = useState([]);
    const resultado = [];

    useEffect(() => {
        ListarCiclos()
    }, [])

    const ListarCiclos = async(e) => {
        let parametros ={}
        if(e){
            parametros = {
                method: 'POST',
                inputs: {
                    accion: 'buscar_ciclo',
                    nombreCiclo: e.target.value,
                }
            }
        }else{
            parametros = {
                method: 'POST',
                inputs: {
                    accion: 'buscar_ciclo',
                }
            }
        }

        const response = await Service(parametros)
        const datosCiclos = await response.json();
        
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
        if (datosCiclos && datosCiclos != 'No se han encontrado ciclos') {
            datosCiclos.forEach((ciclo) => {
                resultado.push(
                    <tr className="bg-sky-600">
                        <td className="p-3">
                            <div className="font-bold">{ciclo.nombreCiclo}</div>
                        </td>
                        <td className="p-3">
                            <div className="font-bold">{ciclo.nombreFamilia}</div>
                        </td>
                        <td className="p-3 ">
                            <button onClick={()=>{ObtenerFamiliasProfesionales(); setMostrarEditar(true); setCicloEditar(ciclo);}} href="#" className="text-sky-200 hover:text-gray-100  mx-2">
                                <i className="material-icons-outlined text-base">edit</i>
                            </button>
                            <button onClick={()=>{setMostrarBorrar(true); setCicloBorrar(ciclo)}} className="text-sky-200 hover:text-gray-100  ml-2">
                                <i className="material-icons-round text-base">delete_outline</i>
                            </button>
                        </td>
                    </tr>
                )
            })
            setTimeout(() => {
                setLista(resultado)
            })
        }else{
            setLista([])
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="col-span-12">
                <div className="overflow-auto lg:overflow-visible ">
                    <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Listado de Ciclos</h1>
                    <div className="mb-4">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input maxLength="100" type="text" onChange={ListarCiclos} id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Buscar ciclo..." required/>
                        </div>
                    </div>
                    <table className="table text-sky-200 border-separate space-y-6 text-sm">
                        <thead className="bg-sky-800 text-sky-200">
                            <tr>
                                <th className="p-3">Nombre Ciclo</th>
                                <th className="p-3">Familia Profesional</th>
                                <th className="p-3">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista}
                        </tbody>
                    </table>
                </div>
            </div>
            {mostrarBorrar && <BorrarCiclos mostrar={setMostrarBorrar} ciclo={cicloBorrar}></BorrarCiclos>}
            {mostrarEditar && <EditarCiclos mostrar={setMostrarEditar} ciclo={cicloEditar} familias={familias}></EditarCiclos>}
        </div>
    )

}

export default Listado_ciclos;
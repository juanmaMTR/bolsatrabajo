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
    const resultado = [];

    useEffect(() => {
        ListarCiclos()
    }, [])

    const ListarCiclos = async() => {
        const parametros ={
            method: 'POST',
            inputs: {
                accion: 'listadoCiclos',
            }
        }
        const response = await Service(parametros)
        const datosCiclos = await response.json();
        console.log(datosCiclos);

        datosCiclos.forEach(async (ciclo) => {
            const parametros = {
                method: 'POST',
                inputs: {
                    accion: 'obtenerFamiliaProfesionalConId',
                    id: ciclo.idFamilia,
                }
            }
            const response = await Service(parametros)
            const datosFamilia = await response.json();

            console.log(datosFamilia);
            resultado.push(
                <tr className="bg-sky-600">
                    <td className="p-3">
                        <div className="">{ciclo.nombreCiclo}</div>
                    </td>
                    <td className="p-3">
                        <div className="">{datosFamilia.nombre}</div>
                    </td>
                    <td className="p-3 ">
                        <button onClick={()=>{setMostrarEditar(true); setCicloEditar();}} href="#" className="text-sky-200 hover:text-gray-100  mx-2">
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
        },200)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="col-span-12">
                <div className="overflow-auto lg:overflow-visible ">
                    <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Listado de Ciclos</h1>
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
            {mostrarEditar && <EditarCiclos mostrar={setMostrarEditar} ciclo={cicloEditar}></EditarCiclos>}
        </div>
    )

}

export default Listado_ciclos;
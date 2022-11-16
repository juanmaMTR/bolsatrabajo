import React,{useState,useEffect} from "react";
import Service from "../componentesBasicos/Service";

const Listado_ciclos = () => {
    const [lista, setLista] = useState([]);
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

        datosCiclos.forEach(async ciclo => {
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
                <tr className="bg-gray-800">
                    <td className="p-3">
                        <div className="">{ciclo.nombreCiclo}</div>
                    </td>
                    <td className="p-3">
                        <div className="">{datosFamilia.nombre}</div>
                    </td>
                    <td className="p-3 ">
                        <button href="#" className="text-gray-400 hover:text-gray-100  mx-2">
                            <i className="material-icons-outlined text-base">edit</i>
                        </button>
                        <button className="text-gray-400 hover:text-gray-100  ml-2">
                            <i className="material-icons-round text-base">delete_outline</i>
                        </button>
                    </td>
                </tr>
            )
        })
        setLista(resultado)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="col-span-12">
                <div className="overflow-auto lg:overflow-visible ">
                    <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Listado de Ciclos</h1>
                    <table className="table text-gray-400 border-separate space-y-6 text-sm">
                        <thead className="bg-gray-800 text-gray-500">
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
        </div>
    )

}

export default Listado_ciclos;
import React,{useState, useEffect, useRef} from "react";
import Service from "../componentesBasicos/Service";
import '../../css/listado.css'
import Editar_usuario from "./Editar_usuario";


const ListadoUsuarios = () =>{
    
    const [lista, setLista] = useState([]);

    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [mostrarBorrar, setMostrarBorrar] = useState(false);
    const [popUpBorrar, setPopUpBorrar] = useState(false)
    const [usuarioEditar, setUsuarioEditar] = useState(false);
    

   
    useEffect(()=>{
        ListarUsuarios()
    }, [])

    const BuscarUsuario = (e) =>{

        const parametros = {
            method: 'POST',
            inputs: {
                accion: 'buscar_usuario',
                nombreUsuario: e.target.value
            }
        }
        Service(parametros)
    }

    const ListarUsuarios = async ()=>{
        const parametros = {
            method: 'POST',
            inputs: {
                accion: 'listado_usuarios'
            }
        }
        const response = await Service(parametros)
        const datosResponse = await response.json();
        const resultado = []
        console.log(datosResponse);
        
        let estadoTrabajo
        datosResponse.forEach(arrayDatos => {             
            const borrarUsuario = () =>{
                const ModalBorrar = <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                                        <div className="bg-white px-16 py-14 rounded-md text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 flex items-center text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                            </svg>
                                            <h1 className="text-xl mb-4 font-bold text-slate-500">¿Desea borrar el usuario {arrayDatos.nombreUsuario}?</h1>
                                            <button onClick={()=>{setPopUpBorrar(false)}} className="bg-red-500 px-4 py-2 rounded-md text-md text-white">No</button>
                                            <button onClick={()=>{setPopUpBorrar(false); peticionBorrar()}} className="bg-green-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Sí</button>
                                        </div>
                                    </div>
                const peticionBorrar = () =>{
                    const parametrosPeticion = {
                        method: 'POST',
                        inputs: {
                            accion: 'borrar_usuario',
                            nombreUsuario: arrayDatos.nombreUsuario
                        }
                    }
                    Service(parametrosPeticion)
                    setTimeout(() => {
                        ListarUsuarios()
                    }, 200);                    
                }             
            
                setPopUpBorrar(ModalBorrar)
            }               
            
            if (arrayDatos.estado == 1) {
                estadoTrabajo = <span className="bg-green-400 text-gray-50 rounded-md px-2">Trabajando</span>
            }else{
                estadoTrabajo = <span className="bg-red-400 text-gray-50 rounded-md px-2">No trabajando</span>
            }
            
            resultado.push(
                <tr className="bg-sky-600">
                    <td className="p-3">
                        <div className="flex align-items-center">
                            <img className="rounded-full h-12 w-12  object-cover" src="https://www.safa.edu/images/galerias/home/4-fundacion-Loyola.jpg" alt="unsplash image"/>
                            <div className="ml-3">
                                <div className="">{arrayDatos.nombreUsuario}</div>
                                <div className="text-neutral-800">{arrayDatos.correo}</div>
                            </div>
                        </div>
                    </td>
                    <td className="p-3">
                        <div className="">{arrayDatos.nombre}</div>
                        <div className="text-neutral-800">{arrayDatos.apellidos}</div>
                    </td>
                    <td className="p-3 font-bold">
                        {arrayDatos.dni}
                    </td>
                    <td className="p-3">
                        {estadoTrabajo}
                    </td>
                    <td className="p-3 ">
                        <button onClick={()=>{setUsuarioEditar(arrayDatos); setMostrarEditar(true);}} className="text-sky-200 hover:text-gray-100  mx-2">
                            <i className="material-icons-outlined text-base">edit</i>
                        </button>
                        <button onClick={()=>{setMostrarBorrar(true); borrarUsuario();}} className="text-sky-200 hover:text-gray-100  ml-2">
                            <i className="material-icons-round text-base">delete_outline</i>
                        </button>
                    </td>
                </tr>
            )
            
        });
        setLista(resultado)
    }    
   
    
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="col-span-12">
                <div className="overflow-auto lg:overflow-visible ">
                    <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Listado de Usuarios</h1>
                    <div className="mb-4">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input maxLength="100" type="text" onChange={BuscarUsuario} id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Buscar usuario..." required/>
                        </div>
                    </div>
                    <table className="table text-sky-200 border-separate space-y-6 text-sm">
                        <thead className="bg-sky-800 text-sky-200">
                            <tr>
                                <th className="p-3">Usuario</th>
                                <th className="p-3">Nombre/Apellidos</th>
                                <th className="p-3">DNI</th>
                                <th className="p-3">Estado</th>
                                <th className="p-3">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista}
                        </tbody>
                    </table>
                </div>
            </div>
            {mostrarBorrar && popUpBorrar}
            {mostrarEditar && <Editar_usuario mostrarEditar={setMostrarEditar} usuario={usuarioEditar}/>}
        </div>
    )
    
}

export default ListadoUsuarios
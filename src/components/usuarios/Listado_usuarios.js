import React,{useState, useEffect, useRef} from "react";
import Service from "../componentesBasicos/Service";
import '../../css/listado.css'


const ListadoUsuarios = () =>{
    
    const [lista, setLista] = useState([]);

    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [mostrarListar, setMostrarListar] = useState(false);
    const [popUpListar, setPopUpBorrar] = useState(false)
    const [popUpEditar, setPopUpEditar] = useState(false)
    
    const iNombre = useRef(null)
    const iApellidos = useRef(null)
    const iNombreUsuario = useRef(null)
    const iEstado = useRef(null)
    const iDNI = useRef(null)
    const iCorreo = useRef(null)

   
    useEffect(()=>{
        ListarUsuarios()
    }, [])
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
                const ModalBorrar = <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                                        <div class="bg-white px-16 py-14 rounded-md text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 flex items-center text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                            </svg>
                                            <h1 class="text-xl mb-4 font-bold text-slate-500">¿Desea borrar el usuario {arrayDatos.nombreUsuario}?</h1>
                                            <button onClick={()=>{setPopUpBorrar(false)}} class="bg-red-500 px-4 py-2 rounded-md text-md text-white">No</button>
                                            <button onClick={()=>{setPopUpBorrar(false); peticionBorrar()}} class="bg-green-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Sí</button>
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
                
            const editarUsuario = ()=>{
                const ModalEditar = <div>
                                        <div class="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                                            <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                                                <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                                                    <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Editar usuario {arrayDatos.nombreUsuario}</h1>
                                                    <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Nombre</label>
                                                    <input ref={iNombre} id="name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder={arrayDatos.nombre} />
                                                    <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Apellidos</label>
                                                    <input ref={iApellidos} id="name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder={arrayDatos.apellidos} />
                                                    <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Nombre usuario</label>
                                                    <input ref={iNombreUsuario} id="name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder={arrayDatos.nombreUsuario} />
                                                    
                                                    <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Estado</label>
                                                    <div class="flex justify-center">
                                                        <div class="mb-3 w-full">
                                                            <select ref={iEstado} class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding -no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                                                <option selected>Abrir menú</option>
                                                                <option value="True">Trabajando</option>
                                                                <option value="False">No trabajando</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">DNI</label>
                                                    <input ref={iDNI} id="name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder={arrayDatos.dni} />
                                                    <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Correo</label>
                                                    <input ref={iCorreo} id="name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder={arrayDatos.correo} />

                                                    <div class="flex items-center justify-start w-full">
                                                        <button onClick={()=>{setMostrarEditar(false); peticionEditar()}} class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">Enviar</button>
                                                        <button onClick={()=>{setMostrarEditar(false)}} class="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">Cancelar</button>
                                                    </div>
                                                    <button onClick={()=>{setMostrarEditar(false)}}  class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" aria-label="close modal" role="button">
                                                        <svg  xmlns="http://www.w3.org/2000/svg"  class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" />
                                                            <line x1="18" y1="6" x2="6" y2="18" />
                                                            <line x1="6" y1="6" x2="18" y2="18" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                    const peticionEditar = () =>{
                        const parametrosPeticion = {
                            method: 'POST',
                            inputs: {
                                accion: 'editar_usuario',
                                nombre: iNombre.current.value,
                                apellidos: iApellidos.current.value,
                                nombreUsuario: iNombreUsuario.current.value,
                                estado: iEstado.current.value,
                                dni: iDNI.current.value,
                                correo: iCorreo.current.value,
                                nombreUsuarioAntiguo: arrayDatos.nombreUsuario
                            }
                        }
                        Service(parametrosPeticion)
                        setTimeout(() => {
                            ListarUsuarios()
                        }, 200);  
                    }
                        
                setPopUpEditar(ModalEditar)
            }
            if (arrayDatos.estado == 1) {
                arrayDatos.estado = "Trabajando"                        
                estadoTrabajo = <span class="bg-green-400 text-gray-50 rounded-md px-2">{arrayDatos.estado}</span>
            }else{
                arrayDatos.estado = "No trabajando"
                estadoTrabajo = <span class="bg-red-400 text-gray-50 rounded-md px-2">{arrayDatos.estado}</span>
            }            
            resultado.push(
                <tr class="bg-gray-800">
                    <td class="p-3">
                        <div class="flex align-items-center">
                            <img class="rounded-full h-12 w-12  object-cover" src="https://www.safa.edu/images/galerias/home/4-fundacion-Loyola.jpg" alt="unsplash image"/>
                            <div class="ml-3">
                                <div class="">{arrayDatos.nombreUsuario}</div>
                                <div class="text-gray-500">{arrayDatos.correo}</div>
                            </div>
                        </div>
                    </td>
                    <td class="p-3">
                        <div class="">{arrayDatos.nombre}</div>
                        <div class="text-gray-500">{arrayDatos.apellidos}</div>
                    </td>
                    <td class="p-3 font-bold">
                        {arrayDatos.dni}
                    </td>
                    <td class="p-3">
                        {estadoTrabajo}
                    </td>
                    <td class="p-3 ">
                        <button onClick={()=>{setMostrarEditar(true); editarUsuario();}} href="#" class="text-gray-400 hover:text-gray-100  mx-2">
                            <i class="material-icons-outlined text-base">edit</i>
                        </button>
                        <button onClick={()=>{setMostrarListar(true); borrarUsuario();}} class="text-gray-400 hover:text-gray-100  ml-2">
                            <i class="material-icons-round text-base">delete_outline</i>
                        </button>
                    </td>
                </tr>
            )
        });
        console.log(resultado);
        setLista(resultado)
    }    
   
    
    return(
        <div class="flex items-center justify-center min-h-screen bg-gray-900">
            <div class="col-span-12">
                <div class="overflow-auto lg:overflow-visible ">
                    <table class="table text-gray-400 border-separate space-y-6 text-sm">
                        <thead class="bg-gray-800 text-gray-500">
                            <tr>
                                <th class="p-3">Usuario</th>
                                <th class="p-3">Nombre/Apellidos</th>
                                <th class="p-3">DNI</th>
                                <th class="p-3">Estado</th>
                                <th class="p-3">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista}
                        </tbody>
                    </table>
                </div>
            </div>
            {mostrarListar && popUpListar}
            {mostrarEditar && popUpEditar}
        </div>
    )
    
}

export default ListadoUsuarios
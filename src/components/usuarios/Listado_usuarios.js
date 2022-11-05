import React,{useState, useEffect} from "react";
import Service from "../componentesBasicos/Service";
import '../../css/listado.css'


const ListadoUsuarios = () =>{
    
    const [lista, setLista] = useState([]);

    const [mostrar, setMostrar] = useState(false);
    const [popUp, setPopUp] = useState(false)

    

    let usuario
    useEffect(()=>{
        ListarUsuarios()
    }, [])
    const ListarUsuarios = async ()=>{
        const parametros = {
            method: 'POST',
            url: '../src/php/index.php',
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
                const peticionBorrar = () =>{
                    const parametrosPeticion = {
                        method: 'POST',
                        url: '../src/php/index.php',
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

                const Modal = 
                    <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                        <div class="bg-white px-16 py-14 rounded-md text-center">
                            <h1 class="text-xl mb-4 font-bold text-slate-500">¿Desea borrar el usuario {arrayDatos.nombreUsuario}?</h1>
                            <button onClick={()=>{setPopUp(false)}} class="bg-red-500 px-4 py-2 rounded-md text-md text-white">No</button>
                            <button onClick={()=>{setPopUp(false); peticionBorrar()}} class="bg-green-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Sí</button>
                        </div>
                    </div>
            
                setPopUp(Modal)
                usuario = arrayDatos.nombreUsuario
                console.log(usuario)
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
                        <button href="#" class="text-gray-400 hover:text-gray-100 mr-2">
                            <i class="material-icons-outlined text-base">visibility</i>
                        </button>
                        <button href="#" class="text-gray-400 hover:text-gray-100  mx-2">
                            <i class="material-icons-outlined text-base">edit</i>
                        </button>
                        <button onClick={()=>{setMostrar(true); borrarUsuario()}} class="text-gray-400 hover:text-gray-100  ml-2">
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

            {mostrar && popUp}
        </div>
    )
    
}

export default ListadoUsuarios
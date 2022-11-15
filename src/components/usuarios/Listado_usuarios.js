import React,{useState, useEffect, useRef} from "react";
import Service from "../componentesBasicos/Service";
import ErrorForms from "../componentesBasicos/ErrorForms";
import '../../css/listado.css'

const validarEditar = values => {
    //Realizo las validaciones de los campos del formulario
    const errors={}
    if(!values.nombre){
        errors.nombre = "*Este campo es obligatorio"
    }
    if(!values.apellidos){
        errors.apellidos = "*Este campo es obligatorio"
    }
    if(!values.nombreUsuario){
        errors.nombreUsuario = "*Este campo es obligatorio"
    }else{
        if(values.nombreUsuario == null || values.nombreUsuario.includes(" ")){
            errors.nombreUsuario = "*Este campo no puede estar vacío o incluir caracteres en blanco"
        }
        if(Object.keys(values.nombreUsuario).length >100){
            errors.nombreUsuario = "*Este campo debe tener menos de 100 caracteres"
        }
    }
    if(!values.dni){
        errors.dni = "*Este campo es obligatorio"
    }else{
        const expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
        const expresion_regular_nie = /^[XYZ]\d{7,8}[A-Z]$/;

        if(expresion_regular_dni.test (values.dni) == true){
            let numero = values.dni.substr(0,values.dni.length-1);
            let letr = values.dni.substr(values.dni.length-1,1);
            numero = numero % 23;
            let letra='TRWAGMYFPDXBNJZSQVHLCKET';
            letra=letra.substring(numero,numero+1);
            if (letra!=letr.toUpperCase()) {
                errors.dni='*DNI erroneo, la letra del DNI no se corresponde'
            }else{
                //DNI correcto
            }
        }else{
            if(expresion_regular_nie.test(values.dni) == true){
                //NIE correcto
            }else{
                errors.dni = '*DNI o NIE erroneo'
            }
            //errors.dni='*Dni erroneo, formato no válido'
        }
    }
    if(!values.correo){
        errors.correo = "*Este campo es obligatorio"
    }else{
        const expresion_regular_correo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (expresion_regular_correo.test(values.correo)) {
            //Correo válido
        } else {
            errors.correo="*Correo no válido"
        }
    }
    
    return errors
}

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
        const state = {
            errors: {}
        }
        const handleChange = ({target})=>{
            const {name,value}=target
            this.setState({[name]:value})
        }
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
            const { errors } = this.state   
            const editarUsuario = ()=>{

                const ModalEditar = <div>
                                        <div className="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                                            <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                                                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                                                    <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Editar usuario {arrayDatos.nombreUsuario}</h1>
                                                    <label for="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Nombre</label>
                                                    <input ref={iNombre} id="name" onChange={handleChange()} className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder={arrayDatos.nombre} />
                                                    {errors.nombre && <ErrorForms message={errors.nombre}/>}
                                                    <label for="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Apellidos</label>
                                                    <input ref={iApellidos} id="name" onChange={handleChange()} className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder={arrayDatos.apellidos} />
                                                    {errors.apellidos && <ErrorForms message={errors.apellidos}/>}
                                                    <label for="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Nombre usuario</label>
                                                    <input ref={iNombreUsuario} id="name" onChange={handleChange()} className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder={arrayDatos.nombreUsuario} />
                                                    {errors.nombreUsuario && <ErrorForms message={errors.nombreUsuario}/>}
                                                    <label for="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Estado</label>
                                                    <div className="flex justify-center">
                                                        <div className="mb-3 w-full">
                                                            <select ref={iEstado} onChange={handleChange()} className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding -no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                                                <option selected>Abrir menú</option>
                                                                <option value="True">Trabajando</option>
                                                                <option value="False">No trabajando</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <label for="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">DNI</label>
                                                    <input ref={iDNI} id="name" onChange={handleChange()} className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder={arrayDatos.dni} />
                                                    {errors.dni && <ErrorForms message={errors.dni}/>}
                                                    <label for="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Correo</label>
                                                    <input ref={iCorreo} id="name" onChange={handleChange()} className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder={arrayDatos.correo} />
                                                    {errors.correo && <ErrorForms message={errors.correo}/>}
                                                    <div className="flex items-center justify-start w-full">
                                                        <button onClick={()=>{setMostrarEditar(false); peticionEditar()}} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">Enviar</button>
                                                        <button onClick={()=>{setMostrarEditar(false)}} className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">Cancelar</button>
                                                    </div>
                                                    <button onClick={()=>{setMostrarEditar(false)}}  className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" aria-label="close modal" role="button">
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
                    const peticionEditar = () =>{
                        const { errors, ...sinErrors}=this.state
                        const result = validarEditar(sinErrors)

                        this.setState({errors:result})
                        if(!Object.keys(result).length){
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
                    }
                        
                setPopUpEditar(ModalEditar)
            }
            if (arrayDatos.estado == 1) {
                arrayDatos.estado = "Trabajando"                        
                estadoTrabajo = <span className="bg-green-400 text-gray-50 rounded-md px-2">{arrayDatos.estado}</span>
            }else{
                arrayDatos.estado = "No trabajando"
                estadoTrabajo = <span className="bg-red-400 text-gray-50 rounded-md px-2">{arrayDatos.estado}</span>
            }            
            resultado.push(
                <tr className="bg-gray-800">
                    <td className="p-3">
                        <div className="flex align-items-center">
                            <img className="rounded-full h-12 w-12  object-cover" src="https://www.safa.edu/images/galerias/home/4-fundacion-Loyola.jpg" alt="unsplash image"/>
                            <div className="ml-3">
                                <div className="">{arrayDatos.nombreUsuario}</div>
                                <div className="text-gray-500">{arrayDatos.correo}</div>
                            </div>
                        </div>
                    </td>
                    <td className="p-3">
                        <div className="">{arrayDatos.nombre}</div>
                        <div className="text-gray-500">{arrayDatos.apellidos}</div>
                    </td>
                    <td className="p-3 font-bold">
                        {arrayDatos.dni}
                    </td>
                    <td className="p-3">
                        {estadoTrabajo}
                    </td>
                    <td className="p-3 ">
                        <button onClick={()=>{setMostrarEditar(true); editarUsuario();}} href="#" className="text-gray-400 hover:text-gray-100  mx-2">
                            <i className="material-icons-outlined text-base">edit</i>
                        </button>
                        <button onClick={()=>{setMostrarListar(true); borrarUsuario();}} className="text-gray-400 hover:text-gray-100  ml-2">
                            <i className="material-icons-round text-base">delete_outline</i>
                        </button>
                    </td>
                </tr>
            )
        });
        console.log(resultado);
        setLista(resultado)
    }    
   
    
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="col-span-12">
                <div className="overflow-auto lg:overflow-visible ">
                    <table className="table text-gray-400 border-separate space-y-6 text-sm">
                        <thead className="bg-gray-800 text-gray-500">
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
            {mostrarListar && popUpListar}
            {mostrarEditar && popUpEditar}
        </div>
    )
    
}

export default ListadoUsuarios
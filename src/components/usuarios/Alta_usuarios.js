import React, { useState } from "react";
import ErrorForms from "../componentesBasicos/ErrorForms";
import Service from "../componentesBasicos/Service";

const validate = values => {
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

const Alta_usuarios = () =>{   
    
    const [estado, setEstado] = useState({
        errors:{},
        nombre: "",
        apellidos: "",
        nombreUsuario: "",
        estado: "False",
        dni: "",
        correo: ""
    })

    const [estadoAsignarCiclo, setEstadoAsignarCiclo] = useState(false)
    const [modalAsignarCiclo, setModalAsignarCiclo] = useState([])
    const [respuesta, setRespuesta] = useState([])
    const [listaCiclos, setListaCiclos] = useState({
        cicloContainer: [],
        datosCiclos: [],
    })
    const [modalListaCiclosAgregar, setModalListaCiclosAgregar] = useState([])
    const [estadoModalListaCiclosAgregar, setEstadoModalListaCiclosAgregar] = useState(false)

    const errors = estado.errors
    let listaCiclosContainer = []
    let ObjetoDatosCiclos = []
    let mostrarEliminarCiclos = true

    
    
    const handleChange =(e) =>{
        const {name, value} = e.target
        setEstado({
            ...estado,
            [name] : value,
        })
    }
    const asignarCiclo = async () => {
       
        const ciclos = []
        
        const parametros ={
            method: 'POST',
            inputs: {
                accion: 'buscar_ciclo',
            }
        }
        const response = await Service(parametros)
        const datosCiclos = await response.json();
        console.table(datosCiclos);
    
        

        datosCiclos.forEach(datoCiclo => {
            const actualizarListaCiclos = () =>{
                let listaCiclosAgregar = <div class="right-24 top-1/4 absolute z-10 w-96 h-96 modal-content border-none shadow-lg flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                                            <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                                <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                                                Listado de ciclos a agregar:
                                                </h5>
                                                <button onClick={() =>{listaCiclosContainer = []; ObjetoDatosCiclos = [];setEstadoModalListaCiclosAgregar(false)}} type="button" class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="modal" aria-label="Close">
                                                    <svg  xmlns="http://www.w3.org/2000/svg"  className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <line x1="18" y1="6" x2="6" y2="18" />
                                                        <line x1="6" y1="6" x2="18" y2="18" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div class="overflow-y-scroll h-96 modal-body relative p-4 flex justify-center items-center flex-col">
                                                {listaCiclosContainer}
                                            </div>
                                            <div class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                                <button onClick={() =>{listaCiclosContainer = []; ObjetoDatosCiclos = [];setEstadoModalListaCiclosAgregar(false);}} type="button" class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">
                                                    Eliminar todos
                                                </button>
                                            </div>
                                        </div>
                let cicloContenedor =   <span class="font-medium text-center mb-6 inline-flex items-center rounded-full p-2 bg-sky-500 text-white group transition-all duration-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:outline-none" role="alert" tabindex="0">
                                            <span>{datoCiclo.nombreCiclo}</span>
                                            <span class="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-500 group-hover:px-2 group-focus:px-2">{datoCiclo.nombreFamilia}</span>
                                        </span>                                   
                listaCiclosContainer.push(cicloContenedor)
                
                ObjetoDatosCiclos.push(
                    datoCiclo.idCiclo
                )
                setModalListaCiclosAgregar(listaCiclosAgregar)
            }
            ciclos.push(
                <button onClick={() => {actualizarListaCiclos();setEstadoModalListaCiclosAgregar(true)}} class="mb-6 inline-block w-full px-6 py-2.5 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#exampleModalScrollable">
                    {datoCiclo.nombreCiclo} - ({datoCiclo.nombreFamilia})
                </button>
            )            
        });

        const agregarListaCiclos = () =>{
            setListaCiclos({
                cicloContainer: [...listaCiclos.cicloContainer, listaCiclosContainer],
                datosCiclos: [...listaCiclos.datosCiclos, ObjetoDatosCiclos]
            })
        }
        const BloqueAsignarCiclo = <div class="py-12 bg-gray-700 bg-opacity-50 flex justify-center items-center transition duration-150 ease-in-out z-10 absolute   top-0 right-0 bottom-0 left-0" id="exampleModalScrollable" tabindex="-1" aria-labelledby="exampleModalScrollableLabel">
                                        <div class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                                            <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                                                <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                                    <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                                                    Asignar Ciclo
                                                    </h5>
                                                    <button onClick={() =>{setEstadoAsignarCiclo(false); setEstadoModalListaCiclosAgregar(false); (setListaCiclos({...listaCiclos,cicloContainer: [], datosCiclos:[]}))}} type="button" class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="modal" aria-label="Close">
                                                        <svg  xmlns="http://www.w3.org/2000/svg"  className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" />
                                                            <line x1="18" y1="6" x2="6" y2="18" />
                                                            <line x1="6" y1="6" x2="18" y2="18" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div class="overflow-y-scroll h-96 modal-body relative p-4">
                                                    {ciclos}
                                                </div>
                                                <div class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                                    <button onClick={() =>{setEstadoAsignarCiclo(false); setEstadoModalListaCiclosAgregar(false); (setListaCiclos({...listaCiclos,cicloContainer: [], datosCiclos:[]}))}} type="button" class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">
                                                        Cerrar
                                                    </button>
                                                    <button onClick={() =>{setEstadoAsignarCiclo(false); agregarListaCiclos(); setEstadoModalListaCiclosAgregar(false)}} type="button" class="inline-block px-6 py-2.5 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                                        Añadir
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
        setModalAsignarCiclo(BloqueAsignarCiclo)
    }
    
    

    const handleSubmit=async (event)=>{
        event.preventDefault()
        const {errors,...sinErrors} = estado
        const resultado = validate(sinErrors)
    
        setEstado({
            ...estado,
            errors:resultado,
        })
        if(!Object.keys(resultado).length) {
            //Envio el formulario porque no me llega ningún error
            const parametros = {
                method: 'POST',
                inputs: {
                    accion: 'alta_usuarios',
                    nombre: estado.nombre,
                    apellidos: estado.apellidos,
                    nombreUsuario: estado.nombreUsuario,
                    estado: estado.estado,
                    dni: estado.dni,
                    correo: estado.correo,
                }
            }
            const response = await Service(parametros)
            const datosResponse = await response.json();
            console.log(datosResponse);


            const aniadirCiclosUsuario = async (idCiclo) =>{
                const parametrosCiclosUsuario = {
                    method: 'POST',
                    inputs: {
                        accion: "alta_ciclos_usuario",
                        idCiclo: idCiclo,
                        idUsuario: datosResponse.idUsuario
                    }
                }
                console.log(parametrosCiclosUsuario);
                const responseCiclosUsuario = await Service(parametrosCiclosUsuario)
                const datosResponseCiclosUsuario = await responseCiclosUsuario.json();
                console.log(datosResponseCiclosUsuario);                
            }
            

            console.log(listaCiclos.datosCiclos);
            listaCiclos.datosCiclos.forEach(arrayIdCiclos => {
                arrayIdCiclos.forEach(idCiclo => {                    
                    setTimeout(() => {
                        aniadirCiclosUsuario(idCiclo)
                        console.log(idCiclo);
                    }, 150);
                });
            });


            if(datosResponse.Resultado == "Usuario dado de alta correctamente."){
                setRespuesta(
                                <div class="flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                                    <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                                    <div>
                                        <span class="font-medium">{datosResponse.Resultado}👍</span>
                                    </div>
                                </div>
                )
                     
            }else{
                setRespuesta(
                                <div class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                    <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                                    <div>
                                        <span class="font-medium">{datosResponse.Resultado}😢</span>
                                    </div>
                                </div>
                )
                    
            }
        }
    }
    
    if(!listaCiclos.cicloContainer.length){
        mostrarEliminarCiclos = false
    }


    return(
        <div class="bg-gray-200 bg-opacity-50 flex justify-center items-center min-h-screen">
            <div class="w-full max-w-sm">
                <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Alta de Usuarios</h1>
                <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-left">
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Nombre: </label>
                        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                        {errors.nombre && <ErrorForms message={errors.nombre}/>}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Apellidos: </label>
                        <input type="text" name="apellidos" placeholder="Apellidos" onChange={handleChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                        {errors.apellidos && <ErrorForms message={errors.apellidos}/>}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Nombre Usuario: </label>
                        <input type="text" name="nombreUsuario" onChange={handleChange} placeholder="Nombre de usuario" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                        {errors.nombreUsuario && <ErrorForms message={errors.nombreUsuario}/>}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Estado: </label>
                        <select name="estado" onChange={handleChange} class="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:ring-blue-200 focus:border-blue-300">
                            <option selected value="false">No trabajando</option>
                            <option value="true" >Trabajando</option>
                        </select><br/>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">DNI o NIE: </label>
                        <input type="text" name="dni" onChange={handleChange} placeholder="DNI o NIE" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                        {errors.dni && <ErrorForms message={errors.dni}/>}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Correo: </label>
                        <input type="text" name="correo" onChange={handleChange} placeholder="Correo" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                        {errors.correo && <ErrorForms message={errors.correo}/>}
                    </div>
                    <button onClick={() => {setEstadoAsignarCiclo(true); asignarCiclo()}} class="mb-6 inline-block w-full px-6 py-2.5 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#exampleModalScrollable">
                        Asignar Ciclo
                    </button>
                    <div class="text-center mb-6 flex justify-center items-center flex-col">
                        <span className="font-bold text-center mb-6">Listado de ciclos: </span>
                        {listaCiclos.cicloContainer}
                    </div>

                    {
                        mostrarEliminarCiclos
                        &&
                        <button onClick={() => {(setListaCiclos({...listaCiclos,cicloContainer: [], datosCiclos:[]}))}} class="mb-6 inline-block w-full px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#exampleModalScrollable">
                            Eliminar ciclos
                        </button>
                    }
                    
                    <div class="flex items-center justify-between">
                        <input onClick={handleSubmit} type="button" value="Añadir" name="enviar" class="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"/>
                    </div>
                </div>
                {respuesta}
            </div>
            {estadoAsignarCiclo && modalAsignarCiclo}
            {estadoModalListaCiclosAgregar && modalListaCiclosAgregar}
        </div>
    )
}

    

export default Alta_usuarios;
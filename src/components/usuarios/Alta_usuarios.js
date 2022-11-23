import React from "react";
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
    state = {
        errors: {},
        estado: "false",
        respuesta: [],
        estadoAsignarCiclo: false,
        modalAsignarCiclo: {},
    }
    
    
    
    handleChange= ({target})=>{
        const {name,value}=target
        this.setState({[name]:value})
    }
    
    asignarCiclo = async () => {
        const BloqueAsignarCiclo = 
            <div class="py-12 bg-gray-700 bg-opacity-50 flex justify-center items-center transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="exampleModalScrollable" tabindex="-1" aria-labelledby="exampleModalScrollableLabel">
                <div class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                        Asignar Ciclo
                        </h5>
                        <button type="button" class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="overflow-y-scroll h-96 modal-body relative p-4">
                        {ciclos}
                    </div>
                    <div class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                        <button onClick={() =>this.setState({estadoAsignarCiclo:false})} type="button" class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">
                            Cerrar
                        </button>
                        <button onClick={() =>this.setState({estadoAsignarCiclo:false})} type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                            Añadir
                        </button>
                    </div>
                    </div>
                </div>
            </div>
    
    
        const ciclos = []
        
        
        const parametros ={
            method: 'POST',
            inputs: {
                accion: 'listar_ciclos',
            }
        }
        const response = await Service(parametros)
        const datosCiclos = await response.json();
        console.log(datosCiclos);
    
        datosCiclos.forEach(datoCiclo => {
            console.log(datoCiclo.nombreCiclo);
            ciclos.push(
                <button  class="mb-6 inline-block w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#exampleModalScrollable">
                    {datoCiclo.nombreCiclo}
                </button>
            )            
        });
    
        this.setState({modalAsignarCiclo: BloqueAsignarCiclo})
    }
    
    handleSubmit=async (event)=>{
        event.preventDefault()
        const { errors, ...sinErrors}=this.state
        const result = validate(sinErrors)
    
        this.setState({errors:result})
        if(!Object.keys(result).length) {
            //Envio el formulario porque no me llega ningún error
            const parametros = {
                method: 'POST',
                inputs: {
                    accion: 'alta_usuarios',
                    nombre: this.state.nombre,
                    apellidos: this.state.apellidos,
                    nombreUsuario: this.state.nombreUsuario,
                    estado: this.state.estado,
                    dni: this.state.dni,
                    correo: this.state.correo
                }
            }
            const response = await Service(parametros)
            const datosResponse = await response.json();
            console.log(datosResponse);
            if(datosResponse == "Usuario dado de alta."){
                this.setState({
                    respuesta: <div class="flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                                    <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                                    <div>
                                        <span class="font-medium">{datosResponse}👍</span>
                                    </div>
                                </div>,
                })
                     
            }else{
                this.setState({
                    respuesta: 
                        <div class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                            <div>
                                <span class="font-medium">{datosResponse}😢</span>
                            </div>
                        </div>,
                })
                    
            }
        }
    }
        
    return(
        <div class="bg-gray-200 bg-opacity-50 flex justify-center items-center min-h-screen">
            <div class="w-full max-w-xs">
                <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Alta de Usuarios</h1>
                <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-left">
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Nombre: </label>
                        <input type="text" name="nombre" placeholder="Nombre" onChange={this.handleChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                        {errors.nombre && <ErrorForms message={errors.nombre}/>}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Apellidos: </label>
                        <input type="text" name="apellidos" placeholder="Apellidos" onChange={this.handleChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                        {errors.apellidos && <ErrorForms message={errors.apellidos}/>}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Nombre Usuario: </label>
                        <input type="text" name="nombreUsuario" onChange={this.handleChange} placeholder="Nombre de usuario" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                        {errors.nombreUsuario && <ErrorForms message={errors.nombreUsuario}/>}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Estado: </label>
                        <select name="estado" onChange={this.handleChange} class="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:ring-blue-200 focus:border-blue-300">
                            <option selected value="false">No trabajando</option>
                            <option value="true" >Trabajando</option>
                        </select><br/>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">DNI o NIE: </label>
                        <input type="text" name="dni" onChange={this.handleChange} placeholder="DNI o NIE" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                        {errors.dni && <ErrorForms message={errors.dni}/>}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Correo: </label>
                        <input type="text" name="correo" onChange={this.handleChange} placeholder="Correo" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                        {errors.correo && <ErrorForms message={errors.correo}/>}
                    </div>
                    <button onClick={() => {this.setState({estadoAsignarCiclo:true}); this.asignarCiclo()}} class="mb-6 inline-block w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#exampleModalScrollable">
                        Asignar Ciclo
                    </button>
                    <div class="flex items-center justify-between">
                        <input onClick={this.handleSubmit} type="button" value="Añadir" name="enviar" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"/>
                    </div>
                </div>
                {respuesta}
            </div>
            {estadoAsignarCiclo && modalAsignarCiclo}
        </div>
    )
}

    

export default Alta_usuarios;
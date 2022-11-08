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


class Alta_usuarios extends React.Component{
    state = {
        errors: {}
    }
    handleChange= ({target})=>{
        const {name,value}=target
        this.setState({[name]:value})
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
        }
    }
    render(){
        const { errors } = this.state
        return(
            <div class="bg-white-800 bg-opacity-50 flex justify-center items-center">

                <div class="w-full max-w-xs">
                    <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Alta de Usuarios</h1>
                    <form action="#" method="POST" onSubmit={this.handleSubmit} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Nombre: </label>
                            <input type="text" name="nombre" placeholder="nombre" onChange={this.handleChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                            {errors.nombre && <ErrorForms message={errors.nombre}/>}
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Apellidos: </label>
                            <input type="text" name="apellidos" placeholder="apellidos" onChange={this.handleChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                            {errors.apellidos && <ErrorForms message={errors.apellidos}/>}
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Nombre Usuario: </label>
                            <input type="text" name="nombreUsuario" onChange={this.handleChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                            {errors.nombreUsuario && <ErrorForms message={errors.nombreUsuario}/>}
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Estado: </label>
                            <select name="estado" onChange={this.handleChange} class="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:ring-blue-200 focus:border-blue-300">
                                <option value="true" selected>Trabajando</option>
                                <option value="false">No trabajando</option>
                            </select><br/>
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2">DNI o NIE: </label>
                            <input type="text" name="dni" onChange={this.handleChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                            {errors.dni && <ErrorForms message={errors.dni}/>}
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Correo: </label>
                            <input type="text" name="correo" onChange={this.handleChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                            {errors.correo && <ErrorForms message={errors.correo}/>}
                        </div>
                        <div class="flex items-center justify-between">
                            <input type="submit" value="Añadir" name="enviar" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"/>

                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default Alta_usuarios;
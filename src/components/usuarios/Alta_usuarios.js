import React from "react";
import ErrorForms from "../componentesBasicos/ErrorForms";
import Service from "../componentesBasicos/Service";

const validate = values => {
    const errors={}
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

        if(expresion_regular_dni.test (values.dni) == true){
            let numero = values.dni.substr(0,values.dni.length-1);
            let letr = values.dni.substr(values.dni.length-1,1);
            numero = numero % 23;
            let letra='TRWAGMYFPDXBNJZSQVHLCKET';
            letra=letra.substring(numero,numero+1);
            if (letra!=letr.toUpperCase()) {
                errors.dni='*Dni erroneo, la letra del NIF no se corresponde'
            }else{
                //DNI correcto
            }
        }else{
            errors.dni='*Dni erroneo, formato no válido'
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
    handleSubmit=event=>{
        event.preventDefault()
        const { errors, ...sinErrors}=this.state
        const result = validate(sinErrors)

        this.setState({errors:result})
        if(!Object.keys(result).length) {
            //Envio el formulario porque no me llega ningún error
            console.log("Formulario Enviado");
            const datos = {
                nombre: this.state.nombre,
                apellidos: this.state.apellidos,
                nombreUsuario: this.state.nombreUsuario,
                estado: this.state.estado,
                dni: this.state.dni,
                correo: this.state.correo
            }
            console.log(datos);
            const response=<Service datos={datos}/> //Llamo al servicio para que haga el fetch al php
            console.log(response);
        }
    }
    render(){
        const { errors } = this.state
        return(
            <main>
                <h1>Alta de Usuarios</h1>
                <form action="#" method="POST" onSubmit={this.handleSubmit}>
                    <label>Nombre: </label>
                    <input type="text" name="nombre" onChange={this.handleChange}/><br/>
                    <label>Apellidos: </label>
                    <input type="text" name="apellidos" onChange={this.handleChange}/><br/>
                    {errors.nombreUsuario && <ErrorForms message={errors.nombreUsuario}/>}
                    <label>Nombre Usuario: </label>
                    <input type="text" name="nombreUsuario" onChange={this.handleChange}/><br/>
                    <label>Estado: </label>
                    <select name="estado" onChange={this.handleChange}>
                        <option value="true">Trabajando</option>
                        <option value="false">No trabajando</option>
                    </select><br/>
                    {errors.dni && <ErrorForms message={errors.dni}/>}
                    <label>DNI: </label>
                    <input type="text" name="dni" onChange={this.handleChange}/><br/>
                    {errors.correo && <ErrorForms message={errors.correo}/>}
                    <label>Correo: </label>
                    <input type="text" name="correo" onChange={this.handleChange}/><br/>
                    <input type="submit" value="Añadir" name="enviar"/>
                </form>
            </main>
        )
    }
}
export default Alta_usuarios;
import React from "react";
import ErrorForms from "../componentesBasicos/ErrorForms";

const validate = values => {
    const errors={}
    if(!values.nombreUsuario){
        errors.nombreUsuario = "*Este campo es obligatorio"
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
                    <label>DNI: </label>
                    <input type="text" name="dni" onChange={this.handleChange}/><br/>
                    <label>Correo: </label>
                    <input type="text" name="correo" onChange={this.handleChange}/><br/>
                    <label>Contraseña: </label>
                    <input type="password" name="password" onChange={this.handleChange}/><br/>
                    <input type="submit" value="Añadir" name="enviar"/>
                </form>
            </main>
        )
    }
}
export default Alta_usuarios;
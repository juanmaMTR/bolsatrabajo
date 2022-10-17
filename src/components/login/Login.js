import React from "react";
import ErrorForms from "../componentesBasicos/ErrorForms";


class Login extends React.Component{
    render(){
        return(
            <main>
                <h1>Login</h1>
                <form action="#" method="POST" onSubmit={this.handleSubmit}>
                    <label>Usuario: </label>
                    <input type="text" name="nombre" onChange={this.handleChange}/><br/>
                    <label>Contraseña: </label>
                    <input type="text" name="correo" onChange={this.handleChange}/><br/>
                    <input type="submit" value="Acceder" name="Login"/>
                </form>
            </main>
        )
    }
}
export default Login 
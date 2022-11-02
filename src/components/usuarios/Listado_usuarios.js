import React from "react";
import Service from "../componentesBasicos/Service";


class ListadoUsaurios extends React.Component {
    constructor(){
        super()
        this.ListarUsuarios()
    }
    async ListarUsuarios(){
        const parametros = {
            method: 'POST',
            inputs: {
                accion: 'listado_usuarios'
            }
        }
        const response = await Service(parametros)
        const datosResponse = await response.text();
        // Cambiar a este cuando sea json //const datosResponse = await response.json();
        console.log(datosResponse);
    }
    render(){
        return(
            console.log('nada (quitar esto)')
        )
    }
}

export default ListadoUsaurios
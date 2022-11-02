import React from "react";
import Service from "../componentesBasicos/Service";


class ListadoUsaurios extends React.Component {
    constructor(){
        super()
        const parametros = {
            method: 'POST',
            inputs: {
                accion: 'listado_usuarios'
            }
        }
        const response = Service(parametros)
        console.log(response);
    }
}

export default ListadoUsaurios
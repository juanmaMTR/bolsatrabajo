<<<<<<< HEAD
const Service = (parametros) => {

    console.log(parametros)

    const inputs = JSON.stringify(parametros.inputs)
    const url = parametros.url
    const opcionesPeticion = {
        method: parametros.method,
        headers: {'Content-Type': 'application/json'},
        body: inputs
    }
    fetch(url, opcionesPeticion)
       .then(response => response)
        
    

}
export default Service
=======
import React from 'react';
import { environment } from './environment';

const url = environment.apiURl + 'index.php';
export default class Service extends React.Component {
    constructor(props) {
        super(props);
        const datos = props => props.datos;
        fetch( url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( datos )
        }).then(
            (response) => {return response}
        )
    }
    /*servicio(  ){
        const datos = props => props.datos;
        fetch( url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( datos )
        }).then(
            (response) => {return response}
        )
    }*/
}
>>>>>>> 496bf46250bdc649c18d56a5afbb05021fa3f865

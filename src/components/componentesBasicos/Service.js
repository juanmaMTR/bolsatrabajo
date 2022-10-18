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
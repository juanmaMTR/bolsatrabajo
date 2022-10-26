import generateCookie from '../componentesBasicos/GenerateCookie'
const Auth = async parametros => {

    console.log(parametros)

    const store = {};

    // Insertar el JWT en el objeto
    store.setJWT = function (data) {
        this.JWT = data;
    };
    
    const inputs = JSON.stringify(parametros.inputs)
    const url = parametros.url
    const opcionesPeticion = {
        method: parametros.method,
        headers: {'Content-Type': 'application/json'},
        body: inputs
    }

    const response = await fetch(url, opcionesPeticion)
    
    const jsonResponse = await response.json();
    const jwtToken = jsonResponse.token
    console.log(jwtToken)

    generateCookie(jwtToken)
    

}

export default Auth
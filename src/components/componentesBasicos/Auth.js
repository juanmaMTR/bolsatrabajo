const Auth = async () => {

    const url = '../src/php/authentication/autenticacion.php'
    const opcionesPeticion = {
        method: 'GET'
    }

    const response = await fetch(url, opcionesPeticion)    

    const responseJson = await response.json()
    return responseJson
}

export default Auth
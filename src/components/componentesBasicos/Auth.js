const Auth = async (parametros) => {

    console.log(parametros)

    const inputs = JSON.stringify(parametros.inputs)
    const url = parametros.url
    const opcionesPeticion = {
        method: parametros.method,
        headers: {'Content-Type': 'application/json'},
        body: inputs
    }

    await fetch(url, opcionesPeticion)

}

export default Auth
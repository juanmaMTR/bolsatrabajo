const Service = async parametros => {

    console.log(parametros)

    const inputs = JSON.stringify(parametros.inputs)
    const url = parametros.url
    const opcionesPeticion = {
        method: parametros.method,
        headers: {'Content-Type': 'application/json'},
        body: inputs
    }

    const response = await fetch(url, opcionesPeticion)        
    
    return response

}
export default Service
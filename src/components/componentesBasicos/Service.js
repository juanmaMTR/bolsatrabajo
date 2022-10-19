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
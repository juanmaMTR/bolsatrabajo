import { environment } from "./environment"

const Service = (parametros) => {

    console.log(parametros)

    const inputs = JSON.stringify(parametros.inputs)
    const url = environment.apiURL + 'index.php'
    const opcionesPeticion = {
        method: parametros.method,
        headers: {'Content-Type': 'application/json'},
        body: inputs
    }
    fetch(url, opcionesPeticion)
        //.then(response => response)
       .then(response =>{
        console.log(response.respuesta);
       })
        
    

}
export default Service
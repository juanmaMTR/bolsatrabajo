import { environment } from "./environment"

const Service = async parametros => {

    console.log(parametros)

    const inputs = JSON.stringify(parametros.inputs)
    const url = environment.apiURL + 'index.php'
    const opcionesPeticion = {
        method: parametros.method,
        headers: {'Content-Type': 'application/json'},
        body: inputs
    }
    await fetch(url, opcionesPeticion)
        //.then(response => response)
       .then(response =>{
        console.log(response);
       })
        
    

}
export default Service
import { environment } from "./environment"

const Auth = async () => {

    const url = environment.apiURL
    const accion = {
        accion : 'autenticar'
    }
    const body = JSON.stringify(accion)
    const opcionesPeticion = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body : body
    }

    const response = await fetch(url, opcionesPeticion)    

    const responseJson = await response.json()
    return responseJson
}

export default Auth
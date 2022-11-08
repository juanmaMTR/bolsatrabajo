import { environment } from "./environment"

const Auth = async () => {

    const url = environment.authUrl
    const opcionesPeticion = {
        method: 'GET'
    }

    const response = await fetch(url, opcionesPeticion)    

    const responseJson = await response.json()
    return responseJson
}

export default Auth
import jwt_decode from 'jwt-decode'
import Cookies from 'universal-cookie'

const DecodeCookie = () =>{

    const cookies = new Cookies()
    const cookieToken = cookies.get('token')

    if(cookieToken == null){
        return "Debe iniciar sesión para recibir el token."
    }else{
        const decodedCookie = jwt_decode(cookieToken)
        return decodedCookie
    }
}
export default DecodeCookie
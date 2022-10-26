import Cookies from 'universal-cookie'
import jwt_decode from 'jwt-decode'

const generateCookie = async value =>{
    const cookies = new Cookies()
    cookies.set('token', value, { path: '/' })

    console.log(cookies.get('token')); 

    const decoded = jwt_decode(value)

    console.log(decoded);
}
export default generateCookie
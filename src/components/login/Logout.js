import Service from "../componentesBasicos/Service";
const Logout = () =>{
    
    const parametros = {
        method: 'POST',
        inputs : {
            accion: 'borrar_cookies'
        }
    }
    Service(parametros)
    
    window.location.href = "/21/"
}
export default Logout
import Service from "../componentesBasicos/Service";
const Logout = (inicioSesion) =>{
    
    const parametros = {
        method: 'POST',
        inputs : {
            accion: 'borrar_cookies'
        }
    }
    Service(parametros)
    
    if(inicioSesion.message == "OK"){
        window.location.href = "/21/"
    }
}
export default Logout
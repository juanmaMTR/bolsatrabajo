import Service from "../componentesBasicos/Service";
const Logout = () =>{
    
    const parametros = {
        method: 'POST',
        inputs : {
            accion: 'borrar_cookies'
        }
    }
    Service(parametros)

    setTimeout(() => {
        window.location.href = "/21/"
    }, 150);
}
export default Logout
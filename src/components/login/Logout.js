import Service from "../componentesBasicos/Service";
const Logout = (inicioSesion) =>{
    let mensaje = "CORRECTO"
    console.log(inicioSesion);
    // if(mensaje == "CORRECTO"){
    //     window.location.href = "/21/"
    // }

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
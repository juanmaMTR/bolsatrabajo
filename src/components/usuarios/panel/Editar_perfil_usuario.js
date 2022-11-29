import React,{useState} from "react";
import Service from "../../componentesBasicos/Service";
import ErrorForms from "../../componentesBasicos/ErrorForms";

const validate = values => {
    //Realizo las validaciones de los campos del formulario
    const errors={}
    if(!values.nombre){
        errors.nombre = "*Este campo es obligatorio"
    }
    if(!values.apellidos){
        errors.apellidos = "*Este campo es obligatorio"
    }
    if(!values.nombreUsuario){
        errors.nombreUsuario = "*Este campo es obligatorio"
    }else{
        if(values.nombreUsuario == null || values.nombreUsuario.includes(" ")){
            errors.nombreUsuario = "*Este campo no puede estar vacío o incluir caracteres en blanco"
        }
        if(Object.keys(values.nombreUsuario).length >100){
            errors.nombreUsuario = "*Este campo debe tener menos de 100 caracteres"
        }
    }
    if(!values.dni){
        errors.dni = "*Este campo es obligatorio"
    }else{
        const expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
        const expresion_regular_nie = /^[XYZ]\d{7,8}[A-Z]$/;

        if(expresion_regular_dni.test (values.dni) == true){
            let numero = values.dni.substr(0,values.dni.length-1);
            let letr = values.dni.substr(values.dni.length-1,1);
            numero = numero % 23;
            let letra='TRWAGMYFPDXBNJZSQVHLCKET';
            letra=letra.substring(numero,numero+1);
            if (letra!=letr.toUpperCase()) {
                errors.dni='*DNI erroneo, la letra del DNI no se corresponde'
            }else{
                //DNI correcto
            }
        }else{
            if(expresion_regular_nie.test(values.dni) == true){
                //NIE correcto
            }else{
                errors.dni = '*DNI o NIE erroneo'
            }
            //errors.dni='*Dni erroneo, formato no válido'
        }
    }
    if(!values.correo){
        errors.correo = "*Este campo es obligatorio"
    }else{
        const expresion_regular_correo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (expresion_regular_correo.test(values.correo)) {
            //Correo válido
        } else {
            errors.correo="*Correo no válido"
        }
    }
    
    return errors
}

/**
 * @file Editar_perfil_usuario.js
 * @description Permite editar el perfil del usuario
 * @param {boolean} mostrarEditar booleano para  mostrar el componente de editar perfil
 * @param {array} usuario datos del usuario que se va a editar
 * @returns
 */
const Editar_perfil_usuario = ({mostrarEditar, usuario}) => {
    const [estadoUsuario, setEstadoUsuario] = useState('false')
    const [estado, setEstado] = useState({
        errors:{},
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        nombreUsuario: usuario.nombreUsuario,
        estado: usuario.estado,
        dni: usuario.dni,
        correo: usuario.correo
    })
    const options = []
    const errors = estado.errors

    const peticionEditar = async () =>{
        const {errors,...sinErrors} = estado
        const resultado = validate(sinErrors)

        setEstado({
            ...estado,
            errors:resultado,
        })
        if(!Object.keys(resultado).length) {
            const parametrosPeticion = {
                method: 'POST',
                inputs: {
                    accion: 'editar_usuario',
                    nombre: estado.nombre,
                    apellidos: estado.apellidos,
                    nombreUsuario: usuario.nombreUsuario,
                    estado: estado.estado,
                    dni: estado.dni,
                    correo: estado.correo,
                    nombreUsuarioAntiguo: usuario.nombreUsuario
                }
            }
            console.log(parametrosPeticion);
            const response = await Service(parametrosPeticion)
            const datosResponse = await response.json()
            console.log(datosResponse);
            mostrarEditar(false);
            setTimeout(() => {
                //window.location.href = "/21/panel_u"
            }, 200);
        }
    }

    const handleChange =(e) =>{
        const {name, value} = e.target
        setEstado({
            ...estado,
            [name] : value,
        })
    }

    if(usuario.estado == 1){
        setEstadoUsuario('true')
        options.push(
            <>
                <option selected value="True">Trabajando</option>
                <option value="False">No Trabajando</option>            
            </>
        )
    }else{
        setEstadoUsuario('false')
        options.push(
            <>
                <option value="True">Trabajando</option>
                <option selected value="False">No Trabajando</option>            
            </>
        ) 
    }

    return(
        <div>
            <div className="py-12 bg-gray-700 bg-opacity-50 flex justify-center items-center transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Editar usuario {usuario.nombreUsuario}</h1>
                        <label for="nombre" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Nombre</label>
                        <input name="nombre" value={estado.nombre} id="nombre" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" onChange={handleChange}/>
                        {errors.nombre && <ErrorForms message={errors.nombre}/>}
                        <label for="apellidos" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Apellidos</label>
                        <input name="apellidos" value={estado.apellidos} id="apellidos" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" onChange={handleChange}/>
                        {errors.apellidos && <ErrorForms message={errors.apellidos}/>}
                        <label for="estado" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Estado</label>
                        <div className="flex justify-center">
                            <div className="mb-3 w-full">
                                <select name="estado" onChange={handleChange} className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding -no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                                    {options}
                                </select>
                            </div>
                        </div>

                        <label for="dni" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">DNI</label>
                        <input name="dni" value={estado.dni} id="dni" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" onChange={handleChange}/>
                        {errors.dni && <ErrorForms message={errors.dni}/>}
                        <label for="correo" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Correo</label>
                        <input name="correo" value={estado.correo} id="correo" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" onChange={handleChange}/>
                        {errors.correo && <ErrorForms message={errors.correo}/>}
                        <div className="flex items-center justify-start w-full">
                            <button onClick={()=>{peticionEditar()}} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">Enviar</button>
                            <button onClick={()=>{mostrarEditar(false)}} className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">Cancelar</button>
                        </div>
                        <button onClick={()=>{mostrarEditar(false)}}  className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-sky-200 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" aria-label="close modal" role="button">
                            <svg  xmlns="http://www.w3.org/2000/svg"  className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Editar_perfil_usuario
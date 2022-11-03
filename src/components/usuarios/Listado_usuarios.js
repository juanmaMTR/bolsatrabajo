import {useState} from "react";
import Service from "../componentesBasicos/Service";


const ListadoUsaurios = () =>{
    
    // async actualizarLista(datosResponse){
    //     this.setState({lista: datosResponse})
    // }
    const [lista, setLista] = useState(0);
    const [usuario,setUsuario] = useState(1);

    const ListarUsuarios = async ()=>{
        const parametros = {
            method: 'POST',
            inputs: {
                accion: 'listado_usuarios'
            }
        }
        const response = await Service(parametros)
        //const datosResponse = await response.text();
        const datosResponse = await response.json();
        console.log(datosResponse);
        setLista(datosResponse)
        {BorrarUsuario(lista[1]['nombreUsuario'])}
        //handleUsuario()
        //return await datosResponse
    }
    const BorrarUsuario = async (nombreUsuario)=>{
        const parametros = {
            method: 'POST',
            inputs:{
                accion: 'borrar_usuario',
                nombreUsuario: nombreUsuario
            }
        }
        const response = await Service(parametros)
        const datosResponse = await response.json()
        console.log(datosResponse);
    }
    const handleUsuario= ()=> {
        for (let index = 0; index < lista.length; index++) {
            setUsuario(lista[index])
        }
    }
    return(
        <div>
            <p>You clicked {lista} times</p>
            <button onClick={ListarUsuarios}>
            Click me
            </button>
            
            {/* {usuario => usuario && (
                <dl>
                    <dt>Title:</dt>
                    <dd>{album.title}</dd>
                    <dt>Artist:</dt>
                    <dd>{album.artist}</dd>
                    <dt>Genre:</dt>
                    <dd>{album.genre}</dd>
                </dl>
            )} */}
        </div>
    )
    
}

export default ListadoUsaurios
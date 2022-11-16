import React from "react";
import Service from "../componentesBasicos/Service";

const BorrarCiclos = ({mostrar,ciclo}) => {
    const peticionBorrar = () =>{
        const parametrosPeticion = {
            method: 'POST',
            inputs: {
                accion: 'borrarCiclo',
                nombre: ciclo.nombreCiclo
            }
        }
        Service(parametrosPeticion)
        window.location.reload();                  
    }  
    return(
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
            <div className="bg-white px-16 py-14 rounded-md text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 flex items-center text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <h1 className="text-xl mb-4 font-bold text-slate-500">¿Desea borrar el ciclo {ciclo.nombreCiclo}?</h1>
                <button onClick={()=>{mostrar(false);}} className="bg-red-500 px-4 py-2 rounded-md text-md text-white">No</button>
                <button onClick={()=>{mostrar(false); peticionBorrar();}} className="bg-green-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Sí</button>
            </div>
        </div>
    )
}

export default BorrarCiclos;
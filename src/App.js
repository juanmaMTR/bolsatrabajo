import './App.css';
import Login from './components/login/Login';
import Alta_usuarios from './components/usuarios/Alta_usuarios';
import ListadoUsuarios from './components/usuarios/Listado_usuarios';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Auth from './components/componentesBasicos/Auth';
import DecodeCookie from './components/componentesBasicos/DecodeCookie';
import Alta_ciclos from './components/ciclos/Alta_ciclos';
import Listado_ciclos from './components/ciclos/Listado_ciclos';
import Service from './components/componentesBasicos/Service';
import React, {useState, useEffect, useRef, useCallback} from "react";
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import PageNotFound from './components/404/404';
import Alta_idiomas from './components/idiomas/Alta_idiomas';
import Panel_usuario from './components/usuarios/Panel_usuario';
import Panel_perfil_usuario from './components/usuarios/panel/Panel_perfil_usuario';

function App() {
  const [sesion, setsesion] = useState(0);
  const inputUsuario = useRef(null);
  const inputPasswd = useRef(null);
  const inputCorreo = useRef(null);
  const [booleanInstalacion, setBooleanInstalacion] = useState(false)
  const [respuesta, setRespuesta] = useState([])

    
  useEffect(() =>{
      actualizarsesion()
  }, [])
  
  const actualizarsesion = useCallback( async () =>{
    const parametros ={
      method: 'POST',
      inputs: {
        accion: 'autenticar_instalacion',
      }
    }
    const responseInstalador = await Service(parametros)
    const responseInstaladorJson = await responseInstalador.json();

    console.log(responseInstaladorJson.Respuesta);

    if(responseInstaladorJson.Respuesta == 0){
      setBooleanInstalacion(true)
      const responseJson = await Auth()
      const respuestasesion = responseJson.Respuesta
  
      let datos = {
          userName : '',
          type : '',
          message : respuestasesion,
          correo: ''
      }
      if (respuestasesion == 'OK') {
          const datosCookie = DecodeCookie()
          datos = {
              userName : datosCookie.userName,
              type : datosCookie.type,
              message : respuestasesion,
              correo : datosCookie.correo
          }
          setsesion(datos)
      }else{
          setsesion(datos)
      }
    }    
  }, [sesion])
  
  const handleSubmit = async() =>{
    const parametros ={
      method: 'POST',
      inputs: {
        accion: 'instalacion',
        nombreUsuario: inputUsuario.current.value,
        passwd: inputPasswd.current.value,
        correo: inputCorreo.current.value
      }
    }
    const responseInstalacion = await Service(parametros)
    const responseInstalacionJson = await responseInstalacion.json();
    console.log(responseInstalacionJson);

    if(responseInstalacionJson.Respuesta == "Instalación completada."){
      setRespuesta(
                      <div class="flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                          <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                          <div>
                              <span class="font-medium">{responseInstalacionJson.Respuesta}👍</span>
                          </div>
                      </div>
      )
      setTimeout(() => {
        window.location.href = "/21"
    }, 1500);    
    }else{
      setRespuesta(
                      <div class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                          <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                          <div>
                              <span class="font-medium">{responseInstalacionJson.Respuesta}😢</span>
                          </div>
                      </div>
      )
    }
  }

  let booleanLogin;
  let booleanSesion;
  if (sesion.message == 'OK') {
    booleanLogin = false;
    booleanSesion = true;
  }else{
    booleanLogin = true;
    booleanSesion = false;
  }
  let booleanTipoUsuario
  if(sesion.type == 's' || sesion.type == 't'){
    booleanTipoUsuario = true
  }else{
    booleanTipoUsuario = false
  }
  console.log(booleanInstalacion);
  return (
    <BrowserRouter>
      <div className="App">
        {
          booleanInstalacion
          ?
          <div>
            <Header inicioSesion={sesion}></Header>
            <Routes>
              <Route path='/21/' element={<Home inicioSesion={sesion}/>}></Route>            
              {booleanTipoUsuario && <Route path='/21/listar_u' element={<ListadoUsuarios inicioSesion={sesion}/>}></Route>}
              {booleanTipoUsuario && <Route path='/21/alta_u' element={<Alta_usuarios inicioSesion={sesion}/>}></Route>}
              {booleanTipoUsuario && <Route path="/21/alta_c" element={<Alta_ciclos/>}></Route>}
              {booleanTipoUsuario && <Route path="/21/listar_c" element={<Listado_ciclos/>}></Route>}
              {booleanTipoUsuario && <Route path="/21/alta_i" element={<Alta_idiomas/>}></Route>}
              {booleanLogin && <Route path='/21/login' element={<Login/>}></Route>}
              {booleanSesion && <Route path='/21/panel_u' element={<Panel_usuario inicioSesion={sesion}/>}>
                <Route path='/21/panel_u/perfil' element={<Panel_perfil_usuario inicioSesion={sesion}/>}/>
                <Route path="/21/panel_u/*" element={<PageNotFound/>} />
              </Route>}
              <Route path="*" element={<PageNotFound/>}></Route>
            </Routes>
            <Footer></Footer>
          </div>
          :
          <div class="bg-gray-200 bg-opacity-50 flex justify-center items-center min-h-screen">
            <div class="w-full max-w-sm">
              <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Instalación</h1>
              <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-left">
                <div class="mb-6">
                  <label class="block text-gray-700 text-sm font-bold mb-2">Nombre Usuario Admin: </label>
                  <input type="text" required ref={inputUsuario} minLength='1' name="nombreUsuario" placeholder="Nombre de usuario" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                </div>
                <div class="mb-6">
                  <label class="block text-gray-700 text-sm font-bold mb-2">Contraseña Admin: </label>
                  <input type="password" required ref={inputPasswd} minLength='1' name="passwd" placeholder="Contraseña" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                </div>
                <div class="mb-6">
                  <label class="block text-gray-700 text-sm font-bold mb-2">Correo: </label>
                  <input type="email" required ref={inputCorreo} pattern=".+@*\.com" minLength='1' name="correo" placeholder="Correo" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-300"/><br/>
                </div>
                <div class="flex items-center justify-between">
                  <input type="button" onClick={handleSubmit} value="Añadir" name="enviar" class="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"/>
                </div>
              </div>
              {respuesta}
            </div>
          </div>
        }
      </div>
    </BrowserRouter>  
  );
}

export default App;

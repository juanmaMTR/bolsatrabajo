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
import React, {useState, useEffect, useCallback} from "react";
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
    
    useEffect(() =>{
        actualizarsesion()
    }, [])

    const actualizarsesion = useCallback( async () =>{
        const responseJson = await Auth()
        const respuestasesion = responseJson.Respuesta

        let datos = {
            userName : '',
            type : '',
            message : respuestasesion
        }
        if (respuestasesion == 'OK') {
            const datosCookie = DecodeCookie()
            datos = {
                userName : datosCookie.userName,
                type : datosCookie.type,
                message : respuestasesion
            }
            setsesion(datos)
        }else{
            setsesion(datos)
        } 
        
    }, [sesion])
    
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
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <Header inicioSesion={sesion}></Header>
          <Routes>
            <Route path='/21/' element={<Home />}></Route>            
            {booleanTipoUsuario && <Route path='/21/listar_u' element={<ListadoUsuarios/>}></Route>}
            {booleanTipoUsuario && <Route path='/21/alta_u' element={<Alta_usuarios/>}></Route>}
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
      </div>
    </BrowserRouter>  
  );
}

export default App;

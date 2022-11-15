import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import Logout from './components/login/Logout';
import Alta_usuarios from './components/usuarios/Alta_usuarios';
import ListadoUsuarios from './components/usuarios/Listado_usuarios';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Auth from './components/componentesBasicos/Auth';
import DecodeCookie from './components/componentesBasicos/DecodeCookie';
import React, {useState, useEffect, useCallback} from "react";
import {
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import PageNotFound from './components/404/404';

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
    console.log(sesion);
    let booleanLogin;
    if (sesion.message == 'OK') {
      booleanLogin = false;
    }else{
      booleanLogin = true;
    }
    console.log(booleanLogin);
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <Header inicioSesion={sesion}></Header>
          <Routes>
            <Route path='/21/' element={<Home />}></Route>
            <Route path='/21/listar_u' element={<ListadoUsuarios/>}></Route>
            <Route path='/21/alta_u' element={<Alta_usuarios/>}></Route>
            {booleanLogin ? <Route path='/21/login' element={<Login/>}></Route> : <Route path='/21/logout' element={<Logout/>}></Route>}
            <Route path="*" element={<PageNotFound/>}></Route>
          </Routes>
          <Footer></Footer>
        </div>
      </div>
    </BrowserRouter>  
  );
}

export default App;

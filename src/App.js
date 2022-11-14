import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import Alta_usuarios from './components/usuarios/Alta_usuarios';
import ListadoUsuarios from './components/usuarios/Listado_usuarios';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import React from "react";
import {
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import PageNotFound from './components/404/404';

function App() { 
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <Header></Header>
          <Routes>
            <Route path='/21/' element={<Home />}></Route>
            <Route path='/21/listar_u' element={<ListadoUsuarios/>}></Route>
            <Route path='/21/alta_u' element={<Alta_usuarios/>}></Route>
            <Route path='/21/login' element={<Login/>}></Route>
            <Route path="*" element={<PageNotFound/>}></Route>
          </Routes>
          <Footer></Footer>
        </div>
      </div>
    </BrowserRouter>  
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import Alta_usuarios from './components/usuarios/Alta_usuarios';
import ListadoUsuarios from './components/usuarios/Listado_usuarios';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";

function App() { 
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <header id="header" className="fixed-top ">
            <div className="container d-flex align-items-center">
              <a className="logo me-auto"><img src="../src/assets/img/maletin.png" alt="" className="img-fluid"/></a>

              <nav id="navbar" className="navbar">
                <ul>
                  <li><a className="nav-link scrollto active"><Link to="/21/">Inicio</Link></a></li>
                  <li><a className="nav-link scrollto"><Link to="/21/listar_u">Listado de usuarios</Link></a></li>
                  <li><a className="nav-link scrollto"><Link to="/21/alta_u">Alta de usuarios</Link></a></li>
                  <li><a className="nav-link scrollto">Ofertas</a></li>
                  <li><a className="nav-link scrollto">Empresas</a></li>
                  <li><a className="nav-link scrollto" href="">Contacto</a></li>
                  <li><a className="getstarted scrollto"><Link to="/21/login">Login</Link></a></li>
                </ul>
                <i className="bi bi-list mobile-nav-toggle"></i>
              </nav>
            </div>
          </header>
          <Routes>
            <Route path='/21/listar_u' element={<ListadoUsuarios/>}></Route>
            <Route path='/21/alta_u' element={<Alta_usuarios/>}></Route>
            <Route path='/21/login' element={<Login/>}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

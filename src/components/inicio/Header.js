import React from "react";
import Service from "../componentesBasicos/Service";
import {environment} from "./../componentesBasicos/environment";
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'


class Header extends React.Component{
    constructor (){
        const parametros={
            method:'POST',
            url:environment.apiURL,
            inputs: {
                accion: "comprobarSesion"
            }
        }
        Service(parametros)
    }
  
    render(){
        return(
            <BrowserRouter>
                <header id="header" class="fixed-top ">
                    <div class="container d-flex align-items-center">
                        <a href="index.html" class="logo me-auto"><img src="assets/img/maletin.png" alt="" class="img-fluid"/></a>
                        <nav id="navbar" class="navbar">
                            <ul>
                            <li><Link class="nav-link scrollto active" to="#hero">Inicio</Link></li>
                            <li><Link class="nav-link scrollto" to="">Ofertas</Link></li>
                            <li><Link class="nav-link scrollto" to="">Empresas</Link></li>
                            <li><Link class="nav-link scrollto" to="#contact">Contacto</Link></li>
                            <li><Link class="getstarted scrollto" to="">Login</Link></li>
                            </ul>
                            <i class="bi bi-list mobile-nav-toggle"></i>
                        </nav>
                    </div>
                </header>
                
            </BrowserRouter> 
        )
    }
}
export default Header;
/** <header id="header" class="fixed-top ">
    <div class="container d-flex align-items-center">
    <a href="index.html" class="logo me-auto"><img src="assets/img/maletin.png" alt="" class="img-fluid"/></a>

    <nav id="navbar" class="navbar">
        <ul>
        <li><a class="nav-link scrollto active" href="#hero">Inicio</a></li>
        <?php
        if($_SESSION){
            echo "<li><a href='login.php'>Cerrar Sesion</a></li>";
            if($_SESSION['tipo']=='s' or $_SESSION['tipo']=='t' or $_SESSION['tipo']=='a'){
            echo "<li><a href='#'>Ofertas</a></li>";
            }
        }
        ?>
        if($_SESSION){
            echo "<li><a href='login.php'>Cerrar Sesion</a></li>";
            if($_SESSION['tipo']=='s' or $_SESSION['tipo']=='t'){
            echo "<li><a href='#'>Empresas</a></li>";
            }
        }
        ?>
        <li><a class="nav-link scrollto" href="#contact">Contacto</a></li>
        <li><a class="getstarted scrollto" href="">Login</a></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
    </nav>

    </div>
</header>*/ 



            /*<header id="header" class="fixed-top ">
                <div class="container d-flex align-items-center">
                <a href="index.html" class="logo me-auto"><img src="assets/img/maletin.png" alt="" class="img-fluid"/></a>

                <nav id="navbar" class="navbar">
                    <ul>
                    <li><a class="nav-link scrollto active" href="#hero">Inicio</a></li>
                    <li><a class="nav-link scrollto" href="">Ofertas</a></li>
                    <li><a class="nav-link scrollto" href="">Empresas</a></li>
                    <li><a class="nav-link scrollto" href="#contact">Contacto</a></li>
                    <li><a class="getstarted scrollto" href="">Login</a></li>
                    </ul>
                    <i class="bi bi-list mobile-nav-toggle"></i>
                </nav>

                </div>
            </header>*/

            /**<Switch>
                    <Route path='/ofertas'>
                        <ofertas/>
                    </Route>
                    <Route path='/empresas'>
                        <empresas/>
                    </Route>
                    <Route path='/login'>
                        <login/>
                    </Route>
                </Switch> */
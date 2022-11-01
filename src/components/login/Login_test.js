import '../../css/login_test.css'
import {useRef} from "react";
import Service from "../componentesBasicos/Service"
import DecodeCookie from '../componentesBasicos/DecodeCookie'
// import ScriptTag from 'react-script-tag';


const Login_test = () => {    

    console.log(DecodeCookie())  

    const inputUsuario = useRef(null)
    const inputContrasenia = useRef(null)

    const handleSubmit = async (event) => {
        event.preventDefault()

        console.log(inputUsuario);
        const parametros = {
            method: 'POST',
            url: '../src/php/index.php',
            inputs : {
                accion: 'login',
                inputUsuario : inputUsuario.current.value,
                inputContrasenia: inputContrasenia.current.value
            }
        }

        Service(parametros)   
        //Recarga la página     
        //window.location.reload()
    }
  return (
    <body class="img js-fullheight" style="background-image: url(../../images/bg.jpg);">
        <section class="ftco-section">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-6 text-center mb-5">
                        <h2 class="heading-section">Login</h2>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-6 col-lg-4">
                        <div class="login-wrap p-0">
                            <h3 class="mb-4 text-center">Acceso a la plataforma</h3>
                            <form action="#" class="signin-form">
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Username" required/>
                                </div>
                                <div class="form-group">
                                    <input id="password-field" type="password" class="form-control" placeholder="Password" required/>
                                    <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="form-control btn btn-primary submit px-3">Sign In</button>
                                </div>
                                <div class="form-group d-md-flex">
                                    <div class="w-50">
                                        <label class="checkbox-wrap checkbox-primary">Recuérdame
                                            <input type="checkbox" checked/>
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    <div class="w-50 text-md-right">
                                        <a href="#" style="color: #fff">Recuperar contraseña</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </body>
  )
}

export default Login_test;
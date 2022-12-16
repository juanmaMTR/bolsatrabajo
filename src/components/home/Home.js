import { AcademicCapIcon, BriefcaseIcon, ComputerDesktopIcon, MapPinIcon } from "@heroicons/react/20/solid";
import React,{ useState, useEffect } from "react";

import { Link } from "react-router-dom";


export default function Home({inicioSesion}){
    let booleanSesion = true
    if(inicioSesion.message == "OK"){
        booleanSesion = false
    }

    return(
        <div id="__next" data-reactroot="">
            <section className="header relative pt-16 items-center flex h-screen" style={{maxHeight:860+'px'}}>
                <div className="container mx-auto items-center flex flex-wrap">
                    <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
                        <div className="pt-32 sm:pt-0">
                            <h2 className="font-semibold text-4xl text-slate-600">Un emprendedor ve oportunidades donde otros solo ven problemas.</h2>
                            <p className="mt-4 text-lg leading-relaxed text-slate-500">
                                Escuela Virgen de Guadalupe dispone de un equipo de profesionales y una red social donde podrás encontrar trabajo en las empresas que se encuentran en nuestra red.
                                A la misma vez las empresas podrán unirse a nuestra red y encontrar a los mejores profesionales para sus empresas.
                            </p>
                            <div className="mt-12">
                                {
                                    booleanSesion
                                    &&
                                    <Link className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-pink-500 active:bg-pink-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150" to={'/21/login'}>Comencemos</Link>
                                }
                                <a href="https://github.com/juanmaMTR/bolsatrabajo" className="github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-slate-700 active:bg-slate-600 uppercase text-sm shadow hover:shadow-lg" target="_blank">Github</a>
                            </div>
                        </div>
                    </div>
                </div>
                <img className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12" src="https://raw.githubusercontent.com/juanmaMTR/bolsatrabajo/jdBranch/src/assets/imgs/busqueda_trabajo_asesoramiento.png" alt="..." style={{maxHeight:860+'px',zIndex:-1}} />
            </section>
            <section className="mt-40 pb-40 relative bg-slate-100">
                <div className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute" style={{height:80+'px'}}>
                    <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                        <polygon className="text-slate-100 fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
                <div className="container mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-pink-600">
                                <img alt="..." src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=700&amp;q=80" className="w-full align-middle rounded-t-lg" />
                                <blockquote className="relative p-8 mb-4">
                                <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95" className="absolute left-0 w-full block" style={{height:95+'px',top:-94+'px'}}>
                                    <polygon points="-30,95 583,95 583,65" className="text-pink-600 fill-current"></polygon>
                                </svg>
                                <h4 className="text-xl font-bold text-white">Consigue a las mejores empresas que se adapten a tus necesidades.</h4>
                                <p className="text-md font-light mt-2 text-white">En esta web podrás encontrar muchas empresas, las cuales tengan diferentes ofertas de trabajo.Tú podrás ponerte en contacto con la empresa que mejor te convenga.</p>
                                </blockquote>
                            </div>
                        </div>
                        <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-pink-600">
                                <img alt="..." src="https://www.formacionyestudios.com/wp-content/uploads/2016/08/derechos-y-obligaciones-educacion-secundaria-grupo.jpg" className="w-full align-middle rounded-t-lg" />
                                <blockquote className="relative p-8 mb-4">
                                <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95" className="absolute left-0 w-full block" style={{height:95+'px',top:-94+'px'}}>
                                    <polygon points="-30,95 583,95 583,65" className="text-pink-600 fill-current"></polygon>
                                </svg>
                                <h4 className="text-xl font-bold text-white">Consigue los mejores alumnos para tu empresa.</h4>
                                <p className="text-md font-light mt-2 text-white">En esta web podrás encontrar una gran diversidad de alumnos, dónde la empresas podrá ponerse en contacto con el que mejor le convenga atente a las necesidades de esta misma.</p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto overflow-hidden pb-20">
                    <div className="flex flex-wrap items-center">
                        <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
                            <div className="text-slate-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                                <BriefcaseIcon/>
                            </div>
                            <h3 className="text-3xl mb-2 font-semibold leading-normal">Empresas</h3>
                            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-slate-600">El Colegio cuenta con muchas empresas punteras en todo tipo de sectores.</p>
                            <div className="block pb-6">
                                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">AFIVEN EXTREMADURA S.L.</span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">AUTOMOCIÓN DEL OESTE S.A.</span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">CABLEX, S.L.</span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">CENTROWAGEN S.L.</span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">ELECNOR S.A</span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">INDRA PRODUCCION DE SOFTWARE</span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">PREVING CONSULTORES</span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">TREVAUTO S.L.</span>
                            </div>
                        </div>
                        <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mt-32">
                            <div className="relative flex flex-col min-w-0 w-full mb-6 mt-48 md:mt-0">
                                <img alt="..." src="https://consultas2.oepm.es/ceo/ImagenMarcaServlet?urlMarca=http://imagensignos.oepm.local/imagenes/000473/0001752177.jpg" className="w-full align-middle rounded absolute shadow-lg" style={{maxWidth:100+'px',left:145+'px',top:-29+'px',zIndex:3}} />
                                <img alt="..." src="https://tienda.centrowagen.com/www/wp-content/uploads/2019/01/Logo-Centrowagen-e1547536969945.jpg" className="w-full align-middle rounded-lg absolute shadow-lg" style={{maxWidth:210+'px',left:260+'px',top:-160+'px'}} />
                                <img alt="..." src="https://multimedia.infojobs.net/api/v1/tenants/c7e2b9c1-8480-43b0-ad9e-000c17aa2cbb/domains/718302b6-5343-43d3-a8a3-829dc3da0893/buckets/6f3ab1cc-5920-4f4e-b131-46a4587a0e1f/images/1e/1e796e34-b14c-4d19-9b16-3dcaa56d3552?jwt=eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NzA5MDA4OTUsInJxcyI6IkdFVFxcL3RlbmFudHMvYzdlMmI5YzEtODQ4MC00M2IwLWFkOWUtMDAwYzE3YWEyY2JiL2RvbWFpbnMvNzE4MzAyYjYtNTM0My00M2QzLWE4YTMtODI5ZGMzZGEwODkzL2J1Y2tldHMvNmYzYWIxY2MtNTkyMC00ZjRlLWIxMzEtNDZhNDU4N2EwZTFmL2ltYWdlcy8xZS8xZTc5NmUzNC1iMTRjLTRkMTktOWIxNi0zZGNhYTU2ZDM1NTIiLCJtZXRhZGF0YSI6eyJydWxlIjp7InZlcnNpb24iOiIyMDE2LTEwIiwiYWN0aW9ucyI6W119fX0.FOBQ7LwVpX2Vd8pSv0ZocNLBctmKv3KS4evYitRhgCQNJ4VVBv_PwEJAleNp9liYAorUyBNNLyvCjtR_BUHqF5KbHMabSFbmu_cYsJUx-TJoceUsVkmurbPNoX3NxXShy-ekz9u2DVBfNMxNyjce07bsmJnGFKPQkQTrEq_9EPVXdV1S2a0lFkmM97liRu7he4rEQ7_x88vQHZ4X629B0AazddKfCuiD0CJq-hasUCuFZlvfMozFhaJ2sdR_vtPYVFY4fstMdIAXhDgnLmJ4UDU0RY-yxz7ED7QaLwgB96S9CK4aqOq8Wcbm4tRmsFn7vWzBSkUOHE7AkYZVvWYiyA&AccessKeyId=d724d9a53d95a810" className="w-full align-middle rounded-lg absolute shadow-lg" style={{maxWidth:180+'px',left:40+'px',top:-225+'px',zIndex:2}} />
                                <img alt="..." src="https://www.elecnor.com/resources/files/1/elecnor-logo2.webp" className="w-full align-middle rounded-lg absolute shadow-2xl" style={{maxWidth:200+'px',left:-50+'px',top:25+'px'}} />
                                <img alt="..." src="https://www.preving.com/media/logo-home.png" className="w-full align-middle rounded-lg absolute shadow-2xl" style={{maxWidth:200+'px',left:240+'px',top:80+'px'}} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center pt-32">
                        <div className="w-full md:w-6/12 px-4 mr-auto ml-auto mt-32">
                            <div className="justify-center flex flex-wrap relative">
                                <div className="my-4 w-full lg:w-6/12 px-4">
                                    <div className="bg-sky-500 shadow-lg rounded-lg text-center p-8">
                                        <ComputerDesktopIcon className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white" />
                                        <p className="text-lg text-white mt-4 font-semibold">Ciclo DAW</p>
                                        <p className="text-base text-white opacity-75 mt-2">Este tipo de ciclos están formados para ocupar puestos más vinculados al diseño web, las analíticas y el posicionamiento orgánico, gestionando servidores de bases de datos y aplicaciones, o implementando apps en entornos web útiles para las empresas.</p>
                                    </div>
                                    <div className="bg-emerald-500 shadow-lg rounded-lg text-center p-8 mt-8">
                                        <img src="https://raw.githubusercontent.com/juanmaMTR/bolsatrabajo/master/src/assets/imgs/car-service.png" className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white" />
                                        <p className="text-lg text-white mt-4 font-semibold">Electromecánica</p>
                                        <p className="text-base text-white opacity-75 mt-2">En este módulo aprenderás a realizar operaciones de mantenimiento, montaje de accesorios y transformaciones en las áreas de mecánica, hidráulica, neumática y electricidad del sector de automoción.</p>
                                    </div>
                                </div>
                                <div className="my-4 w-full lg:w-6/12 px-4 lg:mt-16">
                                    <div className="bg-orange-500 shadow-lg rounded-lg text-center p-8">
                                        <CpuChipIcon className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white" />
                                        <p className="text-lg text-white mt-4 font-semibold">Sistema microinformáticos y redes</p>
                                        <p className="text-base text-white opacity-75 mt-2">Este módulo se basa en realizar trabajos de instalación, configuración y mantenimiento de sistemas microinformáticos, aislados o en red, así como redes locales en pequeños entornos, asegurando su funcionalidad y aplicando los protocolos de calidad, seguridad y respeto al medio ambiente establecidos.</p>
                                    </div>
                                    <div className="bg-red-600 shadow-lg rounded-lg text-center p-8 mt-8">
                                        <img alt="..." className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white" src="https://raw.githubusercontent.com/juanmaMTR/bolsatrabajo/master/src/assets/imgs/brazo-robotico.png" />
                                        <p className="text-lg text-white mt-4 font-semibold">Mecatrónica Industrial</p>
                                        <p className="text-base text-white opacity-75 mt-2">En este módulo aprenderás la capacidad para verificar, realizar ajustes y efectuar la puesta en marcha de equipos, sistemas y componentes digitales, aplicar técnicas de medición de señales digitales, técnicas de programación en bajo y alto nivel</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
                            <div className="text-slate-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                                <AcademicCapIcon/>
                            </div>
                            <h3 className="text-3xl mb-2 font-semibold leading-normal">Alumnos</h3>
                            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-slate-600">La empresas pueden buscar alumnos altamente cualificados para el tipo de trabajo que estas vayan a realizar.</p>
                            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-slate-600">También podrán contactar con ellos de forma personal a través de teléfonos, correos...</p>
                            <div className="block pb-6">
                                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">DAW</span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">SMR</span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">Electromecánica de vehículos automóviles</span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">Gestión Administrativa</span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">Mantenimiento Electromecánico</span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">Sistema microinformáticos y redes</span>
                                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">Mecatrónica Industrial</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 pb-32 pt-48" id="contacto">
                    <div className="items-center flex flex-wrap">
                        <div className="w-full md:w-5/12 ml-auto px-12 md:px-4">
                            <div className="md:pr-12">
                                <div className="text-slate-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                                    <MapPinIcon />
                                </div>
                                <h3 className="text-3xl font-semibold">Nuestra Ubicación</h3>
                                <p className="mt-4 text-lg leading-relaxed text-slate-500"><b>Escuela Virgen de Gudalupe</b><br/>C/Corte de Peleas,79 (06009) Badajoz<br/>Tlf.:924 251 761<br/>Correo: guadalupe@fundacionloyola.es<br/>Fundación inscrita en el Registro de Entidades Religiosas (159/SE/F)</p>
                            </div>
                        </div>
                        <div className="w-full md:w-6/12 mr-auto px-4 pt-24 md:pt-0">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3106.0934212444035!2d-6.956451284715548!3d38.87610437957392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd16e5cfc2a5f865%3A0xd7c3ba9075baee7b!2sEscuela%20Virgen%20de%20Guadalupe!5e0!3m2!1ses!2ses!4v1671015932490!5m2!1ses!2ses" width="600" height="450" style={{transform:[{scale: 1}, {perspective:1040+'px'}, {rotateY:-11+'deg'}, {rotateX:2+'deg'}, {rotate:2+'deg'}],border:0}} className="max-w-full rounded-lg shadow-xl" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </section>
      </div>
    )
}
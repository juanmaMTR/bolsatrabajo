import React from "react";

const Politica_cookies = () => {
    return(
      <div className="container mx-auto max-w-2xl justify-center">
        <h1 className="text-3xl text-gray-800 font-semibold">Política de Cookies</h1>
        <p className="mt-2 text-gray-600">
          Esta Política de Cookies se aplica a nuestra página web. Utilizamos cookies
          para mejorar la experiencia del usuario, así como para ofrecer contenido
          personalizado.
        </p>
        <h2 className="text-2xl text-gray-800 font-semibold">¿Qué son las cookies?</h2>
        <p className="mt-2 text-gray-600">
          Las cookies son pequeños archivos de texto que se almacenan en su
          dispositivo cuando visita nuestro sitio web. Estos archivos permiten a
  
          nuestra página web recordar información sobre sus preferencias, como
          sus credenciales de inicio de sesión y otra información que pueda
          necesitar para mejorar su experiencia.
        </p>
        <h2 className="text-2xl text-gray-800 font-semibold">
            Tipos de cookies
        </h2>
        <p className="mt-2 text-gray-600">
            Existen tres tipos principales de cookies: las cookies estrictamente
            necesarias, las cookies de funcionalidad y las cookies de rendimiento. Las
            cookies estrictamente necesarias se utilizan para garantizar la seguridad
            del sitio web y proporcionar funcionalidades básicas. Las cookies de
            funcionalidad se utilizan para mejorar la funcionalidad del sitio web. Las
            cookies de rendimiento se utilizan para analizar el rendimiento del sitio
            web y mejorar su experiencia de usuario.
        </p>
        <h2 className="text-2xl text-gray-800 font-semibold">
          ¿Qué cookies utilizamos?
        </h2>
        <p className="mt-2 text-gray-600">
          Utilizamos dos cookies necesarias para guardar el inicio de sesión de los
          usuarios. Estas son PHPSESSID, donde se guarda la sesión de php del
          usuario, y token, donde se guarda el token generado con la sesión.
        </p>
      </div>
    )
}

export default Politica_cookies;
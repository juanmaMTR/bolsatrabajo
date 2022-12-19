//Para que una progressive web application se pueda instalar necesita:
//1 manifest válido
//2 dominio https o localhost
//3 tener registrado el evento de fetch

const nombreCache = 'BolsaTrabajo';
//Cachear archivos
const archivos = [
    'index.html',
    'static/**/*.{js,css}',
    'error.html'
];

//Una vez instalado el serviceWorker..
//Sólo se ejecuta una vez
self.addEventListener('install', (e) => {
    console.log('Instalado el Service Worker');

    //Esperar hasta que se descarguen todos los archivos de cache
    e.waitUntil(
        caches.open(nombreCache)
            .then(cache => {
                cache.addAll(archivos);
            })
    )


});


//Activar serviceWorker
self.addEventListener('activate', (e) => {
    console.log('ServiceWorker Activado');
    // Actualizar PWA
    e.waitUntil(
        caches.keys()
            .then(keys => {
                console.log(keys);

                return Promise.all(keys
                    .filter(key => key !== nombreCache)
                    .map(key => caches.delete(key)) // borrar los demas
                )
            })
    )
});


//Evento fetch para descargar archivos estáticos
self.addEventListener('fetch', e => {
    console.log('Fetch...', e);

    e.respondWith(
        caches.match(e.request)
            .then(respuestaCache => {
                return respuestaCache || fetch(e.request);
            })
            .catch(() => caches.match('error.html'))
    );
});
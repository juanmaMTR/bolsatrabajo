const ServiceJWT = async parametros => {

    console.log(parametros)

    const store = {};

    // Insertar el JWT en el objeto
    store.setJWT = function (data) {
        this.JWT = data;
    };
    
    const inputs = JSON.stringify(parametros.inputs)
    const url = parametros.url
    const opcionesPeticion = {
        method: parametros.method,
        headers: {'Content-Type': 'application/json'},
        body: inputs
    }

    const response = await fetch(url, opcionesPeticion)
    
    console.log(response);

    if (response.status >= 200 && response.status <= 299) {
        const jwt = await response.text();
        store.setJWT(jwt);
        console.log(response.status, response.statusText);
      } else {
    
        console.log(response.status, response.statusText);
      }

      console.log(store.JWT);
      const res = await fetch('../src/php/authentication/recurso.php', {
        headers: {
          'Authorization': `Bearer ${store.JWT}`
        }
      });
      const timeStamp = await res.text();
      console.log(timeStamp)

}
export default ServiceJWT
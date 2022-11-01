const Auth = async () => {

    const url = '../src/php/index.php'
    const opcionesPeticion = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }

    await fetch(url, opcionesPeticion)

}

export default Auth
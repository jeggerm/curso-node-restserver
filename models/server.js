const cors = require('cors');
const express = require('express');

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';

        // Middlewares
        this.middlewares();
        // Rutas de la aplicacion
        this.routes();
    }

    middlewares(){
        // CORS
        this.app.use( cors() );

        // Lectura y Parsing y del Body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public'));

    }

    routes(){

        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen(){

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto 8080');
        })
    }

}

module.exports = Server;

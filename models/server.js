const cors = require('cors');
const express = require('express');
const { dbConnection } = require('../database/config');

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar Base de Datos
        this.conectarDB();

        // Middlewares
        this.middlewares();
        // Rutas de la aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
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
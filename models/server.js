const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth      : '/api/auth',
            buscar    : '/api/buscar',
            categorias: '/api/categorias',
            productos : '/api/productos',
            usuarios  : '/api/usuarios' ,
            uploads   : '/api/uploads'          
        }

        //this.usuariosPath = '/api/usuarios';
        //this.authPath     = '/api/auth';

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

        // Fileupload  Carga de Archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    }

    routes(){

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/user'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));

    }

    listen(){

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto 8080');
        })
    }

}

module.exports = Server;
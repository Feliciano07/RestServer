const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Conectar base de datos
        this.database();

        this.middlewares();
        this.routes();

    }

    routes(){
        this.app.use(this.usuariosPath, require('../routers/usuarios.routes'));

        this.app.use(this.authPath, require('../routers/auth.routes'));
    }

    listen(){
        
        this.app.listen(this.port, ()=>{
            console.log('Server start in port', this.port);
        })
    }

    middlewares(){
        // Directorio publico
        this.app.use(express.static('public'));
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

    }

    async database(){
        await dbConnection();
    }

}


module.exports = Server;
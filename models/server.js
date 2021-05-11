const express = require('express');
const cors = require('cors');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios'

        this.middlewares();
        this.routes();

    }

    routes(){
        this.app.use(this.usuariosPath, require('../routers/usuarios.routes'));
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

}


module.exports = Server;
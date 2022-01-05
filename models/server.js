const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar'
        }
        //Conectar base de datos
        this.database();

        this.middlewares();
        this.routes();

    }

    routes(){
        this.app.use(this.paths.usuarios, require('../routers/usuarios.routes'));
        this.app.use(this.paths.auth, require('../routers/auth.routes'));
        this.app.use(this.paths.categorias, require('../routers/categorias.routes'));
        this.app.use(this.paths.productos, require('../routers/productos.routes'));
        this.app.use(this.paths.buscar, require('../routers/buscar.routes'));
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
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')
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
            buscar: '/api/buscar',
            uploads: '/api/uploads',
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
        this.app.use(this.paths.uploads, require('../routers/uploads.routes'));
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

        // Manejo del file upload - carga de archivo
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));

    }

    async database(){
        await dbConnection();
    }

}


module.exports = Server;fileUpload
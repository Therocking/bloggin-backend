const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.paths = {
            users: '/api/users'
        };

        // db connection
        this.dbConnection();
        
        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    routes() {
        this.app.use( this.paths.users, require('../routes/users') );
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Read and parse
        this.app.use( express.json() );
    }

    async dbConnection() {
        await dbConnection();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Running in port:', this.port);
        })
    }
}

module.exports = Server;
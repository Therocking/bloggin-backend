const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.paths = {
            auth: '/api/auth',
            posts: '/api/posts',
            users: '/api/users',
        };

        // db connection
        this.dbConnection();
        
        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth') ); // auth
        this.app.use( this.paths.posts, require('../routes/posts') ); // posts
        this.app.use( this.paths.users, require('../routes/users') ); // users
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Read and parse
        this.app.use( express.json() );

        this.app.use( express.static('public') )
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
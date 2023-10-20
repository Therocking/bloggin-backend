import express, { Application } from 'express';
import cors from 'cors';

import usersRouter from '../routes/users';
import { mongoConnection } from '../db/config';
import fileUpload from 'express-fileupload';

class Server {
    private app: Application;
    private port: string;
    public apiRoutes = {
        users: '/api/users',
        auth: '/api/auth',
        post: '/api/posts',
        comments: '/api/comments',
        claps: '/api/claps',
        uploads: '/api/uploads',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';

        this.dbConnetion();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use( cors() );
        
        this.app.use( express.json() );
        // this.app.use( express.urlencoded() );
        
        // this.app.use( express.static('public') )

        // this.app.get('*') //Todo: Ruta 404

        this.app.use( fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp'
        }) );
    }

    dbConnetion() {
        mongoConnection() // MongoDB
    }

    routes() {
        this.app.use( this.apiRoutes.users, usersRouter ); // usuarios
        //this.app.use( this.apiRoutes.auth ); // auth
        //this.app.use( this.apiRoutes.post ); // posts
        //this.app.use( this.apiRoutes.comments ); // comments
        //this.app.use( this.apiRoutes.claps ); // claps
        //this.app.use( this.apiRoutes.uploads ); // uploads
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server in port', this.port);
        });
    }
}

export default Server;

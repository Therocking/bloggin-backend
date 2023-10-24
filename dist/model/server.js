"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const users_1 = __importDefault(require("../routes/users"));
const auth_1 = __importDefault(require("../routes/auth"));
const posts_1 = __importDefault(require("../routes/posts"));
const comments_1 = __importDefault(require("../routes/comments"));
const uploads_1 = __importDefault(require("../routes/uploads"));
const config_1 = require("../db/config");
class Server {
    constructor() {
        this.apiRoutes = {
            users: '/api/users',
            auth: '/api/auth',
            post: '/api/posts',
            comments: '/api/comments',
            uploads: '/api/uploads',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.dbConnetion();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        // this.app.use( express.urlencoded() );
        this.app.use(express_1.default.static('public'));
        // this.app.get('*') //Todo: Ruta 404
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp'
        }));
    }
    dbConnetion() {
        (0, config_1.mongoConnection)(); // MongoDB
    }
    routes() {
        this.app.use(this.apiRoutes.users, users_1.default); // usuarios
        this.app.use(this.apiRoutes.auth, auth_1.default); // auth
        this.app.use(this.apiRoutes.post, posts_1.default); // posts
        this.app.use(this.apiRoutes.comments, comments_1.default); // comments
        this.app.use(this.apiRoutes.uploads, uploads_1.default); // uploads
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server on port', this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map
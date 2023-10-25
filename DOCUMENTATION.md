# Node Blogging

Aplicación de blogging con:
- Autenticación de usuario
- Autenticación con google sign-in
- Autorización con JWT
- Administración de usuarios
- Creación de posts
- Eliminación de posts
- Modificación de post
- Fechas de creación y modificación
- Busqueda de usuarios y posts 
- Comentarios
- Subida de imagenes
- Claps

## Tecnológias
- NodeJS
- cors
- cloudinary
- bcryptjs
- express
- express-validator
- express-fileupload
- google-auth-library
- jsonwebtoken
- mongoDB
- mongoose

## Especifícaciones

### Usuario
Etructura de los usuarios:
```javascript
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,       
    },
    email: {
        type: String,
        required: true,
	    unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: USER_ROLE
    },
    google: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});
```
-------------

### Post
Estructura de los posts:
```javascript
const PostSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        default: null
    },
    img: {
        type: String,
        default: null
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    }],
    claps: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    status: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: null
    }
});
```
-------------

### Comentario 
Estructura de los comentarios:
```javascript
const CommentSchema = new Schema({
    msg: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post_id: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: null
    },
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    }],
    comment_parent_id: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    }
});
```
-------------

## Rutas

### Autenticación
- /api/auth/login - POST
- /api/auth/google - POST

### Usuarios
- /api/user - GET - POST 
- /api/user/:id - DELETE - PUT - GET 

### Posts
- /api/posts - GET - POST 
- /api/posts/:id - DELETE - PUT - GET
- /api/posts/clap/:id - POST 

### Comentarios
- /api/comments/' - GET
- /api/comments/:postId' - POST
- /api/comments/answer/:commentId/:postId' - POST
- /api/comments/:commentId' - PUT - DELETE

### Subida de archivos
- /api/uploads/users/:userId - POST
- /api/uploads/posts/:postId - POST

### Busqueda
- /api/search/:term - GET
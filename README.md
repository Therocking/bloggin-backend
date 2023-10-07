# API Blogging
La API está echa para manejar el registro y autenticación de usuarios y subida de archivos, sólo soporta imagenes, usa características de la versión 20.7.0 de node(lectura de env). La API fue creada para experimentar con las nuevas características de node y mejorar las abilidades del backend.

## Run script
- npm install
- nodemon --env-file .env app
- node --env-file .env app

## Tecnologías
- express
- express-validator
- express-fileupload
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- cloudinary
- google-auth-library

## Errores 
### Likes
1. Solo se agregan likes en los posts, los likes de los comentarios y las respuestas no se llegan a sumar.

### Respuestas de comentarios
1. Solo se puede agregar una respuesta, al agregar una respuesta nueva la anterior se elimina y se queda solo la recien agregada.
2. las respuestas no toman las cofiguraciones por defecto del modelo: 
```javascript
// Modelo de las respuestas
const CommentSchema = Schema({
    text: {
        type: String,
        required: true
    },
    creatorUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    likes:[ 
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    answers: [this]
});
```
## Mejoras
- Aceptar subida de archivos mp4 en los posts

## Documentación en Postman
[Más...](https://documenter.getpostman.com/view/27019324/2s9YJgTLap#181106f0-2647-4710-97cd-e89c889c81cc)
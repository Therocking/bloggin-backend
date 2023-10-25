# API Blogging
Esta API está echa con TypeScript y **NodeJS 20**, autenticación, google sign-in y autorización con JWT, subida de imagenes y más. Toda la información se guarda en MongoDB.

- Para leer los archivos se utiliza:**express-fileupload**.
- Para leer las variables de entorno se utiliza el flag: **--env-file**.

## Run scripts
```NodeJS
npm install
npm run dev
npm run build
```

## Build scripts
```NodeJS
npm start
```

## Carácteristicas

### Subida de archivos
Las imagenes se almacenan en **Cloudinary**, dependiendo de que tipo de imagen se sube se guardan en carpetas diferentes, si es la imagen de un post se almacena en Cloudinary  en la carpeta **posts-img**, si es la imagen de un usuario se almacena en la carpeta **users-img**.

Las imagenes de los posts se redimencionan para hacer más pequeñas(width: 400, height: 300).

Las imagenes de los usuarios se redimencionan para hacer más pequeñas(width: 200, height: 150).

### Posts y comentarios
Al obtener los posts la población de los comentarios y sus repuestas están limitadas, sólo llega hasta la primera respuesta de un comentario:

```JSON
{
    "total": 1,
    "posts": [
        {
            "_id": "6536c0787687cf95bf415b67",
            "title": "Este es mi primer post",
            "description": "",
            "img": null,
            "user_id": {
                "_id": "653677504e08f32fa0754425",
                "name": "test1",
                "img": "https://res.cloudinary.com/dt55uhyrq/image/upload/c_pad,h_150,w_200/v1698158893/users-img/sjfzil8mmrwonktwnukj.jpg"
            },
            "comments": [
                {
                    "_id": "6536c2ad9b25457647abb762",
                    "msg": "Hola, este es mi primer comentario",
                    "user_id": {
                        "_id": "653677504e08f32fa0754425",
                        "name": "test1",
                        "img": "https://res.cloudinary.com/dt55uhyrq/image/upload/c_pad,h_150,w_200/v1698158893/users-img/sjfzil8mmrwonktwnukj.jpg"
                    },
                    "created_at": "2023-10-23T18:59:24.952Z",
                    "updated_at": null,
                    "answers": [],
                    "comment_parent_id": null
                },
                {
                    "_id": "6536c3a30305c898421a7a8a",
                    "msg": "Hola, este es mi primer comentario",
                    "user_id": {
                        "_id": "653677504e08f32fa0754425",
                        "name": "test1",
                        "img": "https://res.cloudinary.com/dt55uhyrq/image/upload/c_pad,h_150,w_200/v1698158893/users-img/sjfzil8mmrwonktwnukj.jpg"
                    },
                    "created_at": "2023-10-23T19:03:33.701Z",
                    "updated_at": null,
                    "answers": [],
                    "comment_parent_id": null
                },
                {
                    "_id": "6536c4140305c898421a7a9b",
                    "msg": "Hola",
                    "user_id": {
                        "_id": "653677504e08f32fa0754425",
                        "name": "test1",
                        "img": "https://res.cloudinary.com/dt55uhyrq/image/upload/c_pad,h_150,w_200/v1698158893/users-img/sjfzil8mmrwonktwnukj.jpg"
                    },
                    "created_at": "2023-10-23T19:03:33.701Z",
                    "updated_at": null,
                    "answers": [
                        {
                            "_id": "6536c4970305c898421a7aad",
                            "msg": "Hola",
                            "user_id": {
                                "_id": "653677504e08f32fa0754425",
                                "name": "test1",
                                "img": "https://res.cloudinary.com/dt55uhyrq/image/upload/c_pad,h_150,w_200/v1698158893/users-img/sjfzil8mmrwonktwnukj.jpg"
                            },
                            "post_id": "6536c0787687cf95bf415b67",
                            "created_at": "2023-10-23T19:03:33.701Z",
                            "updated_at": null,
                            "answers": [],
                            "comment_parent_id": "6536c4140305c898421a7a9b",
                            "__v": 0
                        }
                    ],
                    "comment_parent_id": null
                }
            ],
            "claps": [
                "653677504e08f32fa0754425",
                "653676cb4e08f32fa075441d"
            ],
            "status": true,
            "created_at": "2023-10-23T18:50:08.121Z",
            "updated_at": "2023-10-24T15:31:43.347Z"
        }
    ]
}
```

Los comentarios y las respuestas mantienen la referencia al post donde escribieron, así como las repuestas mantienen la referencia a el comentarios al que apunta(si es **null** significa que es un comentario padre). Los comentarios y las repuestas son el mismo tipo se documento, se almacenan en la misma colección y tienen la misma estructura, lo unico que los diferencia es si tiene o no el **comment_parent_id** en null.

Los claps sólo se encuentran en los posts y una vez puesto no se elimina. Sólo se utilizan para contar la cuantos ObjectId hay.

[Más sobre la api en DOCUMENTATION.md]("https://github.com/Therocking/bloggin-backend/blob/main/DOCUMENTATION.md")

## Mejoras
- Fución para buscar por más claps.
- Poblar a crear o actualiza un posts o un comentario.
- Agregar Test.
- Poder subir videos.
- Recibir notificaciones(cuando se le de un clap o agregen un comentario).

## URL de la API
No hay.

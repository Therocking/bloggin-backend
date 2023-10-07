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
- Likes
- Recomendación por más like

## Especifícaciones

### Usuario
Los usuarios requerien el nombre, correo, contraseña, rol, img, estado(si esta en falso significa que está borrado o suspendido), si se autenticó con google, (más) los roles de los usuarios serán: usuarios ADMIN y USER.

### Post
Los comentarios requieren un titulo, estado(si esta en falso significa que está borrado), descripción, fecha de creación, usuario que lo creó, comentrios, likes(la cantidad de likes puede reducir), img, (más).

### Comentario 
Los comentarios requieren descripción, fecha de creación, usuario que lo creó, likes(la cantidad de likes puede reducir), respuestas, (más).

## Rutas

### Auth
#### Público
- /api/auth/login - POST
- /api/auth/google - POST

### Usuarios 
#### Público
- /api/user - GET - POST 
- /api/user/:id - PUT - GET
#### Privado
- /api/user/:id - DELETE

### Posts 
#### Público
- /api/posts - GET - POST 
- /api/posts/:id - DELETE - PUT - GET
- /api/posts/comments/:id - PUT
- /api/posts/likes/:id - PUT
- /api/posts/answers/:id - PUT

### Uploads
#### Público 
- /api/uploads/:contenedor/:id <!-- Contenedor = users o posts -->
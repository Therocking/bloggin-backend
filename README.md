# API Blogging

## Bugs o errores

- Error en la ruta auth/google: MongoServerError: E11000 duplicate key error collection: blogging.users index: mail_1 dup key: { mail: null }. Sucede al intentar ejecutar el `await user.save()`.
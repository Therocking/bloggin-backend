

const dicErrors = {
    // NAME
    NAME_REQUIRED: 'El nombre es obligatorio.',
    // PASS
    PASS_REQUIRED: 'La contraseña es obligatorio.',
    // MAIL
    MAIL_REQUIRED: 'El correo es obligatorio.',
    MAIL_IN_USE: 'El correo ya está en uso.',
    // ID
    ID_INVALID: 'El ID, no es un ID de mongo válido.',
    ID_NOT_IN_USE: 'Nigún usuario existe con ese ID.',
    // USER
    USER_WITHOU_PRIVILEGES: 'EL ususario no tiene privilegios para realizar esa acción.',
    USER_OR_PASS_INCORRECT: 'Usuario o contraseña incorrecta.',
    // TOKEN
    TOKEN_NOT_CREATED: 'No se pudo generar el token.',
    INVALID_TOKEN: 'Token no válido.',
    TOKEN_EXPIRED: 'EL token ha expirado.',
    WITHOUT_TOKEN: 'No hay token en la petición.',
    TOKEN_USER: 'Token no válido. Usuario no existe.',
    INVALID_GOOGLE_TOKEN: 'Token de google no válido.',
    //SYSTEM
    SYSTEM_ERROR: 'Algo salió mal hable con el administrador.'
}

module.exports = {
    ...dicErrors
}
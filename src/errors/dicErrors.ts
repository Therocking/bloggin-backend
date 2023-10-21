const ERRORS = {
    // Propiedades de dicErrors
    NAME_REQUIRED: 'El nombre es obligatorio.',
    PASS_REQUIRED: 'La contraseña es obligatorio.',
    MAIL_REQUIRED: 'El correo es obligatorio.',
    MAIL_IN_USE: 'El correo ya está en uso.',
    ID_INVALID: 'El ID, no es un ID de mongo válido.',
    ID_NOT_IN_USE: 'Nigún usuario o post existe con ese ID.',
    MAIL_OR_PASS_INCORRECT: 'Correo o contraseña incorrecta.',
    USER_UNAUTHORIZED: 'El usuario no tiene permisos para realiza esa acción.',
    USER_BLOCKED: 'El usuario está bloqueado.',
    TOKEN_NOT_CREATED: 'No se pudo generar el token.',
    INVALID_TOKEN: 'Token no válido.',
    TOKEN_EXPIRED: 'EL token ha expirado.',
    WITHOUT_TOKEN: 'No hay token en la petición.',
    TOKEN_USER: 'Token no válido. Usuario no existe.',
    INVALID_GOOGLE_TOKEN: 'Token de google no válido.',
    TITLE_EMPTY: 'El titulo no puedo ir vacío.',
    EXT_INVALID: 'Extención de archivo no aceptada.',
    SYSTEM_ERROR: 'Algo salió mal hable con el administrador.'
};

export default ERRORS;
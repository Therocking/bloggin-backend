const { EXT_INVALID } = require('../errors/dicErrors');


const validFileExt = (req, res, next) => {
    const file = req.files.file;

    const extAccepted = [ 'png', 'jpg', 'jpeg' ]; // Tipo de extenciones válidas
    const nameCutted = file.name.split('.'); // Nombre separado en dos, el nombre y la ext.
    const fileExt = nameCutted[ nameCutted.length - 1 ];

    if( !extAccepted.includes( fileExt ) ) {
        return res.status(400).json({
            msg: EXT_INVALID
        });
    };

    next();
}

module.exports = {
    validFileExt
}
const { Router } = require('express');
const { check } = require('express-validator');

const { validJWT, validFields, validFileExt } = require('../middlewares');
const { uploadFiles } = require('../controllers/uploads');
const { ID_INVALID } = require('../errors/dicErrors');


const router = Router();

router.post('/:collection/:id',[
    validJWT,
    validFields, // Comprueba si hay errores
    check('id', ID_INVALID).isMongoId(),
    validFields, // Comprueba si hay errores
    validFileExt,
    validFields, // Comprueba si hay errores
],uploadFiles);


module.exports = router;
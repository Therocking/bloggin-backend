const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, createUser, updateUser, deleteUser, getUser } = require('../controllers/users');
const { validFields, validJWT, isAdmin } = require('../middlewares');
const { isMailUniq, isUidUsed } = require('../helpers');
const { NAME_REQUIRED, MAIL_REQUIRED, PASS_REQUIRED, ID_INVALID } = require('../errors/dicErrors');

const router = Router();

router.get('/',[
    validJWT,
    validFields, // Comprueba si hay errores
    isAdmin,
    validFields, // Comprueba si hay errores
],getUsers)

router.get('/:userId',[
    validJWT,
    validFields, // Comprueba si hay errores
    isAdmin,
    validFields, // Comprueba si hay errores
    check('userId', ID_INVALID).isMongoId(),
    validFields, // Comprueba si hay errores
    check('userId').custom( isUidUsed ),
    validFields, // Comprueba si hay errores
],getUser)

router.post('/',[
    check('name', NAME_REQUIRED).notEmpty(),
    validFields, // Comprueba si hay errores
    check('password', PASS_REQUIRED).notEmpty(),
    validFields, // Comprueba si hay errores
    check('mail', MAIL_REQUIRED).isEmail(),
    check('mail').custom( isMailUniq ),
    validFields // Comprueba si hay errores
],createUser)

router.put('/:userId',[
    check('userId', ID_INVALID).isMongoId(),
    validFields,
    check('userId').custom( isUidUsed ),
    validFields
],updateUser)

router.delete('/:userId',[
    validJWT,
    isAdmin,
    check('userId', ID_INVALID).isMongoId(),
    validFields,
    check('userId').custom( isUidUsed ),
    validFields
],deleteUser)

module.exports = router;
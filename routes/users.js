const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validFields, validJWT, isAdmin } = require('../middlewares');
const { isMailUniq, isUidUsed } = require('../helpers/db-validators');
const { NAME_REQUIRED, MAIL_REQUIRED, PASS_REQUIRED, ID_INVALID } = require('../errors/dicErrors');

const router = Router();

router.get('/',[
    validJWT,
    validFields,
    isAdmin,
    validFields,
],getUsers)

router.post('/',[
    check('name', NAME_REQUIRED).notEmpty(),
    validFields,
    check('password', PASS_REQUIRED).notEmpty(),
    validFields,
    check('mail', MAIL_REQUIRED).isEmail(),
    check('mail').custom( isMailUniq ),
    validFields
],createUser)

router.put('/:id',[
    check('id', ID_INVALID).isMongoId(),
    validFields,
    check('id').custom( isUidUsed ),
    validFields
],updateUser)

router.delete('/:id',[
    validJWT,
    isAdmin,
    check('id', ID_INVALID).isMongoId(),
    validFields,
    check('id').custom( isUidUsed ),
    validFields
],deleteUser)

module.exports = router;
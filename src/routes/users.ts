import { Router } from 'express';
import { check } from 'express-validator';

import UsersController from '../controllers/users';
import { validFields, validJwt, isAdmin } from '../middlewares/';
import ERRORS from '../errors/dicErrors';
import { emailExist, userIdNotExist } from '../helpers/';


const usersController = new UsersController();
const router = Router();

router.get('/',[
    validJwt,
    validFields, // Valid if have
    isAdmin,
    validFields, // Valid if have any error
], usersController.getUsers);

router.get('/:id',[
    validJwt,
    check('id', ERRORS.ID_INVALID).isMongoId(),
    validFields, // Valid if have any error 
    check('id').custom( userIdNotExist ),
    validFields, // Valid if have any error
],usersController.getUser);

router.post('/',[
    check('name', ERRORS.NAME_REQUIRED).not().isEmpty(),
    validFields, // Valid if have any error 
    check('password', ERRORS.PASS_REQUIRED).not().isEmpty(),
    validFields, // Valid if have any error
    check('email', ERRORS.MAIL_REQUIRED).isEmail(),
    validFields, // Valid if have any error 
    check('email').custom( emailExist ),
    validFields, // Valid if have any error 
],usersController.createUser);

router.put('/:id',[
    validJwt,
    validFields, // Valid if have any error 
    check('id', ERRORS.ID_INVALID).isMongoId(),
    validFields, // Valid if have any error 
    check('id').custom( userIdNotExist ),
    validFields, // Valid if have any error
],usersController.updateUser);

router.delete('/:id',[
    validJwt,
    validFields, // Valid if have any error 
    isAdmin,
    validFields, // Valid if have any error 
    check('id', ERRORS.ID_INVALID).isMongoId(),
    validFields, // Valid if have any error 
    check('id').custom( userIdNotExist ),
    validFields, // Valid if have any error
],usersController.deleteUser);

// The middleware **valid-fields** is reapeted so that there is only one error

export default router;
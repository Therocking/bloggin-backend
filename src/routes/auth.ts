import { Router } from 'express';
import { check } from 'express-validator';

import { validFields } from '../middlewares/';
import ERRORS from '../errors/dicErrors';
import AuthController from '../controllers/auth';


const authController = new AuthController();
const router = Router();

router.post('/login',[
    check('password', ERRORS.NAME_REQUIRED).not().isEmpty(),
    validFields,
    check('email', ERRORS.MAIL_REQUIRED).isEmail(),
    validFields
],authController.login);

router.post('/google', authController.google); //* One error

// The middleware **valid-fields** is reapeted so that there is only one error

export default router;
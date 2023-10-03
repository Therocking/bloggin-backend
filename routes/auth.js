const { Router } = require('express');
const { login, loginGoogle } = require('../controllers/auth');
const { check } = require('express-validator');
const { validFields } = require('../middlewares');
const { isValidUser } = require('../helpers/db-validators');


const router = Router();

router.post('/login',[
    check('mail').custom( isValidUser ),
    validFields
],login);

router.post('/google', loginGoogle)


module.exports = router;
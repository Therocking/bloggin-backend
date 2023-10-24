import { Router } from 'express';
import { check } from 'express-validator';

import { isValidImg, validFields, validJwt, isUserAutorToUpload } from '../middlewares/';
import UploadsController from '../controllers/uploads';
import ERRORS from '../errors/dicErrors';


const uploadsController = new UploadsController();
const router = Router();

router.post('/:collection/:id',[
    validJwt,
    validFields, // Valid if have any error
    // isUserAutorToUpload,
    // validFields, // Valid if have any error
    isValidImg,    
    validFields, // Valid if have any error
    check('id', ERRORS.ID_INVALID).isMongoId(),
    validFields, // Valid if have any error
],uploadsController.uploadImg);


// The middleware **valid-fields** is reapeted so that there is only one error

export default router;
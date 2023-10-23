import { Router } from 'express';
import { check } from 'express-validator';

import { validFields, validJwt } from '../middlewares/';
import ERRORS from '../errors/dicErrors';
import { commentIdNotExist, postIdNotExist } from '../helpers/';
import CommentController from '../controllers/comments';


const commentController = new CommentController();
const router = Router();

router.get('/',commentController.getCommets);

router.post('/:postId',[
    validJwt,
    validFields, // Valid if have any error
    check('postId').custom( postIdNotExist ),
    validFields, // Valid if have any error 
    check('msg', ERRORS.NAME_REQUIRED).not().isEmpty(),
    validFields, // Valid if have any error 
],commentController.createComment);

router.post('/answer/:commentId/:postId',[
    validJwt,
    validFields, // Valid if have any error
    check('commentId').custom( commentIdNotExist ),
    validFields, // Valid if have any error 
    check('postId').custom( postIdNotExist ),
    validFields, // Valid if have any error 
    check('msg', ERRORS.NAME_REQUIRED).not().isEmpty(),
    validFields, // Valid if have any error 
],commentController.addAnswer);

router.put('/:commentId',[
    validJwt,
    validFields, // Valid if have any error 
    check('commentId', ERRORS.ID_INVALID).isMongoId(),
    validFields, // Valid if have any error 
    check('commentId').custom( commentIdNotExist ), // Hacer para comment
    validFields, // Valid if have any error
],commentController.updateComment);


// The middleware **valid-fields** is reapeted so that there is only one error

export default router;
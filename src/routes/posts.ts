import { Router } from 'express';
import { check } from 'express-validator';

import { validFields, validJwt } from '../middlewares/';
import ERRORS from '../errors/dicErrors';
import { postIdNotExist } from '../helpers/';
import PostsController from '../controllers/posts';


const postController = new PostsController();
const router = Router();

router.get('/',[
    validJwt,
    validFields, // Valid if have any error
], postController.getPosts);

router.post('/',[
    validJwt,
    validFields, // Valid if have any error
    check('title', ERRORS.NAME_REQUIRED).not().isEmpty(),
    validFields, // Valid if have any error 
],postController.createPost);

router.put('/:id',[
    validJwt,
    validFields, // Valid if have any error 
    check('id', ERRORS.ID_INVALID).isMongoId(),
    validFields, // Valid if have any error 
    check('id').custom( postIdNotExist ),
    validFields, // Valid if have any error
],postController.updatePost);

router.delete('/:id',[
    validJwt,
    validFields, // Valid if have any error 
    check('id', ERRORS.ID_INVALID).isMongoId(),
    validFields, // Valid if have any error 
    check('id').custom( postIdNotExist ),
    validFields, // Valid if have any error
],postController.deletePost);

// The middleware **valid-fields** is reapeted so that there is only one error

export default router;
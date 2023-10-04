const { Router } = require('express');
const { check } = require('express-validator');
const { getPosts, getPost, createPost, updatePost, deletePost, addLike, addComment, addCommentAnswer, addCommentLike } = require('../controllers/posts');
const { validJWT, validFields, isAdmin } = require('../middlewares');
const { TITLE_EMPTY, ID_INVALID } = require('../errors/dicErrors');
const { isIdUsed, isIdCommentUsed } = require('../helpers');


const router = Router();

router.get('/',[
    validJWT,
    validFields, // Comprueba si hay errores
],getPosts);

router.get('/:postId',[
    validJWT,
    validFields, // Comprueba si hay errores
    check('postId', ID_INVALID).isMongoId(),
    validFields, // Comprueba si hay errores
    check('postId').custom( isIdUsed ),
    validFields, // Comprueba si hay errores
],getPost);

router.post('/',[
    validJWT,
    validFields, // Comprueba si hay errores
    check('title', TITLE_EMPTY).not().isEmpty(),
    validFields, // Comprueba si hay errores
    check('title', 'El titulo debe ser un texto').isString(),
    validFields, // Comprueba si hay errores
],createPost);

router.put('/:postId',[
    validJWT,
    validFields, // Comprueba si hay errores
    check('postId', ID_INVALID).isMongoId(),
    validFields, // Comprueba si hay errores
    check('postId').custom( isIdUsed ),
    validFields, // Comprueba si hay errores
],updatePost);

router.put('/likes/:postId',[
    validJWT,
    validFields, // Comprueba si hay errores
    check('postId', ID_INVALID).isMongoId(),
    validFields, // Comprueba si hay errores
    check('postId').custom( isIdUsed ),
    validFields, // Comprueba si hay errores
],addLike);

router.put('/comments/:postId',[
    validJWT,
    validFields, // Comprueba si hay errores
    check('postId', ID_INVALID).isMongoId(),
    validFields, // Comprueba si hay errores
    check('postId').custom( isIdUsed ),
    validFields, // Comprueba si hay errores
],addComment);

router.put('/comments/answer/:postId',[
    validJWT,
    validFields, // Comprueba si hay errores
    check('postId', ID_INVALID).isMongoId(),
    validFields, // Comprueba si hay errores
    check('postId').custom( isIdUsed ),
    validFields, // Comprueba si hay errores
],addCommentAnswer);

router.delete('/:postId',[
    validJWT,
    validFields, // Comprueba si hay errores
    isAdmin,
    validFields, // Comprueba si hay errores
    check('postId', ID_INVALID).isMongoId(),
    validFields, // Comprueba si hay errores
    check('postId').custom( isIdUsed ),
    validFields, // Comprueba si hay errores
],deletePost);

module.exports = router;
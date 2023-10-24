"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares/");
const dicErrors_1 = __importDefault(require("../errors/dicErrors"));
const helpers_1 = require("../helpers/");
const posts_1 = __importDefault(require("../controllers/posts"));
const postController = new posts_1.default();
const router = (0, express_1.Router)();
router.get('/', [
    middlewares_1.validJwt,
    middlewares_1.validFields, // Valid if have any error
], postController.getPosts);
router.post('/', [
    middlewares_1.validJwt,
    middlewares_1.validFields,
    (0, express_validator_1.check)('title', dicErrors_1.default.NAME_REQUIRED).not().isEmpty(),
    middlewares_1.validFields, // Valid if have any error 
], postController.createPost);
router.post('/clap/:id', [
    middlewares_1.validJwt,
    middlewares_1.validFields,
    (0, express_validator_1.check)('id', dicErrors_1.default.ID_INVALID).isMongoId(),
    middlewares_1.validFields,
    (0, express_validator_1.check)('id').custom(helpers_1.postIdNotExist),
    middlewares_1.validFields, // Valid if have any error
], postController.claps);
router.put('/:id', [
    middlewares_1.validJwt,
    middlewares_1.validFields,
    // isUserAutor, // Valid if user is owner of the post
    middlewares_1.validFields,
    (0, express_validator_1.check)('id', dicErrors_1.default.ID_INVALID).isMongoId(),
    middlewares_1.validFields,
    (0, express_validator_1.check)('id').custom(helpers_1.postIdNotExist),
    middlewares_1.validFields,
    (0, helpers_1.isUserAutor)('post'),
    middlewares_1.validFields, // Valid if have any error
], postController.updatePost);
router.delete('/:id', [
    middlewares_1.validJwt,
    middlewares_1.validFields,
    (0, express_validator_1.check)('id', dicErrors_1.default.ID_INVALID).isMongoId(),
    middlewares_1.validFields,
    (0, express_validator_1.check)('id').custom(helpers_1.postIdNotExist),
    middlewares_1.validFields,
    (0, helpers_1.isUserAutor)('post'),
    middlewares_1.validFields, // Valid if have any error
], postController.deletePost);
// The middleware **valid-fields** is reapeted so that there is only one error
exports.default = router;
//# sourceMappingURL=posts.js.map
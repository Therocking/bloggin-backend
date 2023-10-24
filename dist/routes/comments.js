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
const comments_1 = __importDefault(require("../controllers/comments"));
const commentController = new comments_1.default();
const router = (0, express_1.Router)();
router.get('/', commentController.getCommets); // only for dev env
router.post('/:postId', [
    middlewares_1.validJwt,
    middlewares_1.validFields,
    (0, express_validator_1.check)('postId').custom(helpers_1.postIdNotExist),
    middlewares_1.validFields,
    (0, express_validator_1.check)('msg', dicErrors_1.default.NAME_REQUIRED).not().isEmpty(),
    middlewares_1.validFields, // Valid if have any error 
], commentController.createComment);
router.post('/answer/:commentId/:postId', [
    middlewares_1.validJwt,
    middlewares_1.validFields,
    (0, express_validator_1.check)('commentId').custom(helpers_1.commentIdNotExist),
    middlewares_1.validFields,
    (0, express_validator_1.check)('postId').custom(helpers_1.postIdNotExist),
    middlewares_1.validFields,
    (0, express_validator_1.check)('msg', dicErrors_1.default.NAME_REQUIRED).not().isEmpty(),
    middlewares_1.validFields, // Valid if have any error 
], commentController.addAnswer);
router.put('/:commentId', [
    middlewares_1.validJwt,
    middlewares_1.validFields,
    (0, helpers_1.isUserAutor)('comment'),
    middlewares_1.validFields,
    (0, express_validator_1.check)('commentId', dicErrors_1.default.ID_INVALID).isMongoId(),
    middlewares_1.validFields,
    (0, express_validator_1.check)('commentId').custom(helpers_1.commentIdNotExist),
    middlewares_1.validFields, // Valid if have any error
], commentController.updateComment);
router.delete('/:commentId', [
    middlewares_1.validJwt,
    middlewares_1.validFields,
    (0, helpers_1.isUserAutor)('comment'),
    middlewares_1.validFields,
    (0, express_validator_1.check)('commentId', dicErrors_1.default.ID_INVALID).isMongoId(),
    middlewares_1.validFields,
    (0, express_validator_1.check)('commentId').custom(helpers_1.commentIdNotExist),
    middlewares_1.validFields, // Valid if have any error
], commentController.deleteComment);
// The middleware **valid-fields** is reapeted so that there is only one error
exports.default = router;
//# sourceMappingURL=comments.js.map
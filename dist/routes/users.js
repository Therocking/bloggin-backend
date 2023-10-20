"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_1 = __importDefault(require("../controllers/users"));
const middlewares_1 = require("../middlewares/");
const dicErrors_1 = __importDefault(require("../errors/dicErrors"));
const helpers_1 = require("../helpers/");
const usersController = new users_1.default();
const router = (0, express_1.Router)();
router.get('/', [
    middlewares_1.validJwt,
    middlewares_1.validFields,
    middlewares_1.isAdmin,
    middlewares_1.validFields, // Valid if have any error
], usersController.getUsers);
router.get('/:id', [
    middlewares_1.validJwt,
    (0, express_validator_1.check)('id', dicErrors_1.default.ID_INVALID).isMongoId(),
    middlewares_1.validFields,
    (0, express_validator_1.check)('id').custom(helpers_1.userIdNotExist),
    middlewares_1.validFields, // Valid if have any error
], usersController.getUser);
router.post('/', [
    (0, express_validator_1.check)('name', dicErrors_1.default.NAME_REQUIRED).not().isEmpty(),
    middlewares_1.validFields,
    (0, express_validator_1.check)('email', dicErrors_1.default.MAIL_REQUIRED).not().isEmpty(),
    middlewares_1.validFields,
    (0, express_validator_1.check)('password', dicErrors_1.default.PASS_REQUIRED).not().isEmpty(),
    middlewares_1.validFields, // Valid if have any error
], usersController.postUser);
router.put('/:id', [
    middlewares_1.validJwt,
    middlewares_1.validFields,
    (0, express_validator_1.check)('id', dicErrors_1.default.ID_INVALID).isMongoId(),
    middlewares_1.validFields,
    (0, express_validator_1.check)('id').custom(helpers_1.userIdNotExist),
    middlewares_1.validFields, // Valid if have any error
], usersController.updateUser);
router.delete('/:id', [
    middlewares_1.validJwt,
    middlewares_1.validFields,
    middlewares_1.isAdmin,
    middlewares_1.validFields,
    (0, express_validator_1.check)('id', dicErrors_1.default.ID_INVALID).isMongoId(),
    middlewares_1.validFields,
    (0, express_validator_1.check)('id').custom(helpers_1.userIdNotExist),
    middlewares_1.validFields, // Valid if have any error
], usersController.deleteUser);
// The middleware **valid-fields** is reapeted so that there is only one error
exports.default = router;
//# sourceMappingURL=users.js.map
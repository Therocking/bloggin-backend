"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares/");
const dicErrors_1 = __importDefault(require("../errors/dicErrors"));
const auth_1 = __importDefault(require("../controllers/auth"));
const authController = new auth_1.default();
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('password', dicErrors_1.default.NAME_REQUIRED).not().isEmpty(),
    middlewares_1.validFields,
    (0, express_validator_1.check)('email', dicErrors_1.default.MAIL_REQUIRED).not().isEmpty(),
    middlewares_1.validFields
], authController.login);
// router.get('/google', authController);
// The middleware **valid-fields** is reapeted so that there is only one error
exports.default = router;
//# sourceMappingURL=auth.js.map
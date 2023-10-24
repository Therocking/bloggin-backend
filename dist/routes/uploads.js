"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares/");
const uploads_1 = __importDefault(require("../controllers/uploads"));
const dicErrors_1 = __importDefault(require("../errors/dicErrors"));
const uploadsController = new uploads_1.default();
const router = (0, express_1.Router)();
router.post('/:collection/:id', [
    middlewares_1.validJwt,
    middlewares_1.validFields,
    // isUserAutorToUpload,
    // validFields, // Valid if have any error
    middlewares_1.isValidImg,
    middlewares_1.validFields,
    (0, express_validator_1.check)('id', dicErrors_1.default.ID_INVALID).isMongoId(),
    middlewares_1.validFields, // Valid if have any error
], uploadsController.uploadImg);
// The middleware **valid-fields** is reapeted so that there is only one error
exports.default = router;
//# sourceMappingURL=uploads.js.map
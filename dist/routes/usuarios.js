"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("../controllers/users"));
const valid_jwt_1 = require("../middlewares/valid-jwt");
const usersController = new users_1.default();
const router = (0, express_1.Router)();
router.get('/', valid_jwt_1.validJwt, usersController.getUsers);
router.get('/:id', usersController.getUser);
router.get('/', usersController.postUser);
router.get('/:id', usersController.updateUser);
router.get('/:id', usersController.deleteUser);
exports.default = router;
//# sourceMappingURL=usuarios.js.map
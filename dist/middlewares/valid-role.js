"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const helpers_1 = require("../helpers");
const dicErrors_1 = __importDefault(require("../errors/dicErrors"));
const isAdmin = (req, res, next) => {
    const role = req.user.role;
    if (role !== helpers_1.ADMIN_ROLE)
        return res.status(401).json({
            msg: dicErrors_1.default.USER_UNAUTHORIZED
        });
    next();
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=valid-role.js.map
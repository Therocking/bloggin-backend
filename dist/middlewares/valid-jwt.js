"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../model/user"));
const dicErrors_1 = __importDefault(require("../errors/dicErrors"));
const validJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: dicErrors_1.default.WITHOUT_TOKEN
        });
    }
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.SECRETJWT || 'secret');
        const user = yield user_1.default.findById(uid);
        if (!user || !user.status)
            return res.status(400).json({ msg: dicErrors_1.default.ID_NOT_IN_USE });
        req.user = user;
        next();
    }
    catch (error) {
        if (error.name === 'TokenExpiredError')
            return res.status(401).json({ msg: dicErrors_1.default.TOKEN_EXPIRED });
        res.status(401).json({ msg: dicErrors_1.default.INVALID_TOKEN });
    }
});
exports.validJwt = validJwt;
//# sourceMappingURL=valid-jwt.js.map
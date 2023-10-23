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
exports.isUserAutor = void 0;
const post_1 = __importDefault(require("../model/post"));
const dicErrors_1 = __importDefault(require("../errors/dicErrors"));
const isUserAutor = (id) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const post = yield post_1.default.findById(id);
        if ((post === null || post === void 0 ? void 0 : post.user_id) !== user.id)
            return res.status(400).json({ msg: dicErrors_1.default.USER_UNAUTHORIZED });
        next();
    });
};
exports.isUserAutor = isUserAutor;
//# sourceMappingURL=user-autor.js.map
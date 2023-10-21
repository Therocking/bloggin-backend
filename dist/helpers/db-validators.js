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
exports.emailExist = exports.userIdNotExist = void 0;
const dicErrors_1 = __importDefault(require("../errors/dicErrors"));
const user_1 = __importDefault(require("../model/user"));
// Valid uid
const userIdNotExist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(id);
    if (!user)
        throw new Error(dicErrors_1.default.ID_NOT_IN_USE);
});
exports.userIdNotExist = userIdNotExist;
// Valid email
const emailExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email });
    if (user)
        throw new Error(dicErrors_1.default.MAIL_IN_USE);
});
exports.emailExist = emailExist;
//# sourceMappingURL=db-validators.js.map
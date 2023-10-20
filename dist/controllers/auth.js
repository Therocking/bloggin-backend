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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../model/user"));
const dicErrors_1 = __importDefault(require("../errors/dicErrors"));
const helpers_1 = require("../helpers");
class AuthController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield user_1.default.findOne({ email: email });
                if (!user)
                    return res.status(400).json({ msg: dicErrors_1.default.MAIL_OR_PASS_INCORRECT });
                const correctPass = bcryptjs_1.default.compareSync(password, user.password);
                if (!correctPass)
                    return res.status(400).json({ msg: dicErrors_1.default.MAIL_OR_PASS_INCORRECT });
                const token = yield (0, helpers_1.generateJWT)(user.id);
                res.json({
                    user,
                    token
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    msg: dicErrors_1.default.SYSTEM_ERROR
                });
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.js.map
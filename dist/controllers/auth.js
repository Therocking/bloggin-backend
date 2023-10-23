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
const helpers_1 = require("../helpers");
const verify_google_token_1 = require("../helpers/verify-google-token");
const dicErrors_1 = __importDefault(require("../errors/dicErrors"));
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
        this.google = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { googleToken } = req.body;
            try {
                const { email, name, picture } = yield (0, verify_google_token_1.verify)(googleToken);
                let user = yield user_1.default.findOne({ email });
                if (!user) {
                    const data = {
                        email,
                        name,
                        img: picture,
                        google: true,
                        password: '123456'
                    };
                    user = new user_1.default(data);
                    user.password = user.hashPass(user.password); // Encrypt pass
                    console.log(user);
                    yield user.save();
                }
                if (!user.status)
                    return res.status(401).json({ msg: dicErrors_1.default.USER_BLOCKED });
                const token = yield (0, helpers_1.generateJWT)(user.id);
                res.json({
                    user,
                    token
                });
            }
            catch (error) {
                console.log(error);
                res.status(401).json({ msg: dicErrors_1.default.INVALID_GOOGLE_TOKEN });
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.js.map
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../model/user"));
const helpers_1 = require("../helpers");
const dicErrors_1 = __importDefault(require("../errors/dicErrors"));
class UsersController {
    constructor() {
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { offset = 0, limit = 5 } = req.query;
            const query = { status: true };
            try {
                const [total, users] = yield Promise.all([
                    user_1.default.countDocuments(query),
                    user_1.default.find(query)
                        .skip(Number(offset))
                        .limit(Number(limit))
                ]);
                res.json({
                    total,
                    users
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    msg: dicErrors_1.default.SYSTEM_ERROR
                });
            }
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield user_1.default.findById(id);
                res.json(user);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    msg: dicErrors_1.default.SYSTEM_ERROR
                });
            }
        });
        this.postUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            // Hashing pass
            const salt = bcryptjs_1.default.genSaltSync();
            body.password = bcryptjs_1.default.hashSync(body.password, salt);
            const user = new user_1.default(body);
            // User save in DB
            user.save();
            const token = yield (0, helpers_1.generateJWT)(user.id);
            res.json({
                user,
                token
            });
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _a = req.body, { status, google, password, role, created_at } = _a, rest = __rest(_a, ["status", "google", "password", "role", "created_at"]);
            const { id } = req.params;
            // Hashing pass
            const salt = bcryptjs_1.default.genSaltSync();
            rest.password = bcryptjs_1.default.hashSync(password, salt);
            const user = yield user_1.default.findByIdAndUpdate(id, rest, { new: true });
            res.json(user);
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield user_1.default.findByIdAndUpdate(id, { status: false }, { new: true });
            res.json(user);
        });
    }
}
exports.default = UsersController;
//# sourceMappingURL=users.js.map
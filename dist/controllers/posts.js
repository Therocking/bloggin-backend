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
const post_1 = __importDefault(require("../model/post"));
const dicErrors_1 = __importDefault(require("../errors/dicErrors"));
const helpers_1 = require("../helpers");
class PostsController {
    constructor() {
        this.getPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { limit, offset } = req.query;
            const query = { status: true };
            try {
                const [total, posts] = yield Promise.all([
                    post_1.default.countDocuments(query),
                    post_1.default.find(query)
                        .skip(Number(offset))
                        .limit(Number(limit))
                        .populate('user_id', {
                        name: 1,
                        img: 1
                    })
                        .populate(helpers_1.populateOption)
                ]);
                res.json({
                    total,
                    posts,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: dicErrors_1.default.SYSTEM_ERROR });
            }
        });
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _a = req.body, { status, created_at, updated_at, creator, img } = _a, data = __rest(_a, ["status", "created_at", "updated_at", "creator", "img"]);
            try {
                const postData = Object.assign(Object.assign({}, data), { user_id: req.user.id });
                const post = new post_1.default(postData);
                yield post.save();
                res.status(201).json(post);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: dicErrors_1.default.SYSTEM_ERROR });
            }
        });
        this.claps = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const { id } = req.params;
            try {
                const post = yield post_1.default.findById(id);
                if (post === null || post === void 0 ? void 0 : post.claps.includes(user.id)) {
                    post.claps = post.claps.filter(clap => clap !== user.id);
                }
                else {
                    post === null || post === void 0 ? void 0 : post.claps.unshift(user.id);
                }
                yield (post === null || post === void 0 ? void 0 : post.save());
                res.json(post);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: dicErrors_1.default.SYSTEM_ERROR });
            }
        });
        this.updatePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _b = req.body, { status, created_at, updated_at, creator, img } = _b, data = __rest(_b, ["status", "created_at", "updated_at", "creator", "img"]);
            const { id } = req.params;
            try {
                const postInfo = Object.assign(Object.assign({}, data), { updated_at: Date.now() });
                const post = yield post_1.default.findByIdAndUpdate(id, postInfo, { new: true });
                res.json(post);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: dicErrors_1.default.SYSTEM_ERROR });
            }
        });
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const post = yield post_1.default.findByIdAndUpdate(id, { status: true }, { new: true });
                res.json(post);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = PostsController;
//# sourceMappingURL=posts.js.map
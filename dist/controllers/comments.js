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
const comment_1 = __importDefault(require("../model/comment"));
const post_1 = __importDefault(require("../model/post"));
const dicErrors_1 = __importDefault(require("../errors/dicErrors"));
class CommentController {
    constructor() {
        this.getCommets = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const comments = yield comment_1.default.find()
                .populate('answers');
            res.json(comments);
        });
        this.createComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _a = req.body, { user_id, post_id, created_at, updated_at, comment_parent_id, answers } = _a, data = __rest(_a, ["user_id", "post_id", "created_at", "updated_at", "comment_parent_id", "answers"]);
            const { postId } = req.params;
            try {
                const postComments = yield post_1.default.findById(postId);
                const commentInfo = Object.assign(Object.assign({}, data), { post_id: postId, user_id: req.user.id });
                const comment = new comment_1.default(commentInfo);
                postComments === null || postComments === void 0 ? void 0 : postComments.comments.push(comment.id);
                // const postInfo = {
                //     comments: postComments?.comments.push(comment.id)
                // }
                const [c, post] = yield Promise.all([
                    comment.save(),
                    // Post.findByIdAndUpdate(postId, postInfo, {new: true})
                    postComments === null || postComments === void 0 ? void 0 : postComments.save()
                ]);
                res.status(201).json(c);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: dicErrors_1.default.SYSTEM_ERROR });
            }
        });
        this.addAnswer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _b = req.body, { user_id, post_id, created_at, updated_at, comment_parent_id, answers } = _b, data = __rest(_b, ["user_id", "post_id", "created_at", "updated_at", "comment_parent_id", "answers"]);
            const { commentId, postId } = req.params;
            try {
                const commentInfo = Object.assign(Object.assign({}, data), { user_id: req.user.id, post_id: postId, comment_parent_id: commentId });
                let comment = new comment_1.default(commentInfo);
                const commentParentInfo = {
                    answers: comment.id
                };
                const [c, cp] = yield Promise.all([
                    comment.save(),
                    comment_1.default.findByIdAndUpdate(commentId, commentParentInfo, { new: true })
                ]);
                res.json(c);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: dicErrors_1.default.SYSTEM_ERROR });
            }
        });
        this.updateComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _c = req.body, { user_id, post_id, created_at, updated_at, comment_parent_id, answers } = _c, data = __rest(_c, ["user_id", "post_id", "created_at", "updated_at", "comment_parent_id", "answers"]);
            const { commentId } = req.params;
            try {
                const commentInfo = Object.assign(Object.assign({}, data), { updated_at: Date.now() });
                const comment = yield comment_1.default.findByIdAndUpdate(commentId, commentInfo, { new: true });
                res.json(comment);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: dicErrors_1.default.SYSTEM_ERROR });
            }
        });
    }
}
exports.default = CommentController;
//# sourceMappingURL=comments.js.map
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    msg: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: null
    },
    answers: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Comment',
            default: null
        }],
    comment_parent_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    }
});
CommentSchema.methods.toJSON = function () {
    const _a = this.toObject(), { post_id, __v } = _a, comment = __rest(_a, ["post_id", "__v"]);
    return comment;
};
exports.default = (0, mongoose_1.model)('Comment', CommentSchema);
//# sourceMappingURL=comment.js.map
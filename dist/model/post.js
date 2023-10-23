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
const PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        default: null
    },
    img: {
        type: String,
        default: null
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Comment',
            default: null
        }],
    claps: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        }],
    status: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: null
    }
});
PostSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, post = __rest(_a, ["__v"]);
    return post;
};
exports.default = (0, mongoose_1.model)('Post', PostSchema);
//# sourceMappingURL=post.js.map
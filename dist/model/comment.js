"use strict";
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
exports.default = (0, mongoose_1.model)('Comment', CommentSchema);
//# sourceMappingURL=comment.js.map
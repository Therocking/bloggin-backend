"use strict";
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
            comment_id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Comment',
                default: null
            }
        }],
    claps: [{
            clap_id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Clap',
                default: null
            }
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
exports.default = (0, mongoose_1.model)('Post', PostSchema);
//# sourceMappingURL=post.js.map
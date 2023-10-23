import { Schema, model } from 'mongoose';
import { Iposts } from '../types/types';

const PostSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    }],
    claps: [{
        type: Schema.Types.ObjectId,
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

PostSchema.methods.toJSON = function() {
    const { __v, ...post} = this.toObject();
    return post
}

export default model<Iposts>('Post', PostSchema);
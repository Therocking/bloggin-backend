import { Schema, model } from 'mongoose';
import { USER_ROLE } from '../helpers/roles';
import {Iuser} from '../types/types';


const UserSchema = new Schema({
    name: {
        type: String,
        require: true,       
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    img: String,
    role: {
        type: String,
        default: USER_ROLE
    },
    google: {
        type: Boolean,
        default: true
    },
    status: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.methods.toJSON = function() {
    const { _id, __v, password, ...user} = this.toObject();
    user.uid = _id
    return user
}

export default model<Iuser>('User', UserSchema);
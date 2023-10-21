import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

import { USER_ROLE } from '../helpers/roles';
import {Iuser} from '../types/types';


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,       
    },
    email: {
        type: String,
        required: true,
	    unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: String,
    role: {
        type: String,
        default: USER_ROLE
    },
    google: {
        type: Boolean,
        default: false
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

UserSchema.methods.hashPass = (password: string): string => {
    // Hashing pass
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync( password, salt );
}

export default model<Iuser>('User', UserSchema);

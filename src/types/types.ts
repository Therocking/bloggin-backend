import { Document, Schema } from "mongoose";

//User model
export interface Iuser extends  Document {
    name: string;
    email: string;
    password: string;
    img: string;
    role: string;
    google: boolean;
    status: boolean;
    created_at: Date;
    hashPass(password: string): string;
}

//valid-jwt uid
export interface Iuid {
    uid: string
}

// Google user
export interface IgoogleUser {
    email: string, 
    name: string, 
    picture: string
}

// Posts
export interface Iposts extends Document {
    title: string;
    description: string;
    img: {}; 
    user_id: Schema.Types.ObjectId;
    comments: any;
    claps: any;
    status: boolean;
    created_at: Date;
    updated_at: Date;
}

// Comments
export interface Icomments extends Document {
    msg: string
    user_id: Schema.Types.ObjectId;
    post_id: Schema.Types.ObjectId;
    created_at: Date;
    updated_at: Date;
    comment_parent_id: Schema.Types.ObjectId;
}

// Claps
export interface Iclaps extends Document {
    user_id: Schema.Types.ObjectId;
    post_id: Schema.Types.ObjectId;
}
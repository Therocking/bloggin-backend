import { Document } from "mongoose";

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
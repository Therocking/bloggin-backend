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
    created_at: Date
}

//valid-jwt uid
export interface Iuid {
    uid: string
}
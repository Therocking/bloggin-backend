import ERRORS from '../errors/dicErrors';
import User from '../model/user';
import Post from '../model/post';

// Valid uid
export const userIdNotExist = async( id: string ) => {
    const user = await User.findById(id);
    if( !user ) throw new Error(ERRORS.ID_NOT_IN_USE);
}

// Valid post id
export const postIdNotExist = async( id: string ) => {
    const post = await Post.findById(id);
    if( !post ) throw new Error(ERRORS.ID_NOT_IN_USE);
}

// Valid email
export const emailExist = async( email: string ) => {
    const user = await User.findOne({ email });
    if( user ) throw new Error(ERRORS.MAIL_IN_USE);
}
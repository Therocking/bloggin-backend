import ERRORS from '../errors/dicErrors';
import User from '../model/user';
import Post from '../model/post';
import Comment from '../model/comment';

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

// Valid comment id
export const commentIdNotExist = async( id: string ) => {
    const comment = await Comment.findById(id);
    if( !comment ) throw new Error(ERRORS.COMMENT_NO_FOUND);
}

// Valid email
export const emailExist = async( email: string ) => {
    const user = await User.findOne({ email });
    if( user ) throw new Error(ERRORS.MAIL_IN_USE);
}
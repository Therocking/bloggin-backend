import {Request, Response, NextFunction} from 'express';
import Post from '../model/post';
import Comment from '../model/comment';
import ERRORS from '../errors/dicErrors';

export const isUserAutor = (collection: string) => {
    return async(req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const user = req.user;
    
    let model
    // const models = {
    //     post: Post,
    //     comment: Comment
    // }

    if (collection === 'post') {
        model = await Post.findById(id);
    }else if (collection === 'comment') {
        model = await Comment.findById(id);
    }

    if( model?.user_id !== user.id ) return res.status(401).json({ msg: ERRORS.USER_UNAUTHORIZED }); 

    next();
}
}
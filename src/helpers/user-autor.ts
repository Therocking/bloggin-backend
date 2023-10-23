import {Request, Response, NextFunction} from 'express';
import Post from '../model/post';
import ERRORS from '../errors/dicErrors';

export const isUserAutor = ( id: string ) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        const post = await Post.findById(id);

        if( post?.user_id !== user.id ) return res.status(400).json({ msg: ERRORS.USER_UNAUTHORIZED }); 

        next();
    }
} 
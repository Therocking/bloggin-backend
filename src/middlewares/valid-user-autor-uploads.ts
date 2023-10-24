import {Request, Response, NextFunction} from 'express';

import User from '../model/user';
import Post from '../model/post';
import ERRORS from '../errors/dicErrors';

export const isUserAutorToUpload = async(req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { collection, id } = req.params;

    let model: any;
    if ( collection === 'users' ) {
        model = await User.findById(id);
    }else if(collection === 'users') {
        model = await Post.findById(id);
    }

    if( model.uid !== user.id || model.user_id !== user.id ) return res.status(401).json({ msg: ERRORS.USER_UNAUTHORIZED});
    
    next();
}
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

import User from '../model/user';
import ERRORS from '../errors/dicErrors';
import { Iuid } from '../types/types';


export const validJwt = async( req: Request, res: Response, next: NextFunction ) => {
    const token = req.header('x-token');
    
    if(!token) {
        return res.status(401).json({
            msg: ERRORS.WITHOUT_TOKEN
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETJWT || 'secret') as Iuid
        const user = await User.findById(uid);

        if(!user || !user.status) return res.status(400).json({ msg: ERRORS.ID_NOT_IN_USE });

        req.user = user;

        next();
    } catch (error: any) {
        if( error.name === 'TokenExpiredError' ) return res.status(401).json({ msg: ERRORS.TOKEN_EXPIRED });
        
        res.status(401).json({ msg: ERRORS.INVALID_TOKEN });
    }
}
import {NextFunction, Request, Response} from 'express';
import { ADMIN_ROLE,  } from '../helpers';
import ERRORS from '../errors/dicErrors';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const role = req.user.role;

    if( role !== ADMIN_ROLE ) return res.status(401).json({
        msg: ERRORS.USER_UNAUTHORIZED
    });

    next();
}
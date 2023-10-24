import {Request, Response, NextFunction} from 'express';
import ERRORS from '../errors/dicErrors';

export const isValidImg = async(req: Request, res: Response, next: NextFunction) => {
    const file: any = req.files?.file;
    
    const validExts = ['jpg', 'png', 'jpeg'];

    if( !file ) return res.status(400).json({ msg: ERRORS.FILE_REQUERIDED });

    const nameFileCutted = file.name.split('.');
    const fileExt = nameFileCutted[ nameFileCutted.length - 1 ];

    if( !validExts.includes( fileExt ) ) return res.status(400).json({ msg: ERRORS.EXT_INVALID });

    next();
}
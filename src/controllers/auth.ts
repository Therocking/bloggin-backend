import { Request, Response} from 'express';
import bcrypt from 'bcryptjs';

import User from '../model/user';

import { generateJWT } from '../helpers';
import { verify } from '../helpers/verify-google-token';
import ERRORS from '../errors/dicErrors';
import { IgoogleUser } from '../types/types';

class AuthController {
    login = async(req: Request, res: Response ) => {
        const { email, password } = req.body;

        try {
            
            const user = await User.findOne({ email: email });
            if( !user ) return res.status(400).json({ msg: ERRORS.MAIL_OR_PASS_INCORRECT });
    
            const correctPass = bcrypt.compareSync( password, user.password );
            if( !correctPass ) return res.status(400).json({ msg: ERRORS.MAIL_OR_PASS_INCORRECT });

            const token =  await generateJWT( user.id );

            res.json({
                user,
                token
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: ERRORS.SYSTEM_ERROR
            });
        }
    }

    google = async (req: Request, res: Response) => {
        const { googleToken } = req.body;
    
        try {
            const { email, name, picture } = await verify(googleToken) as IgoogleUser;
    
            let user = await User.findOne({ email });

            if (!user) {
                const data = {
                    email,
                    name,
                    img: picture,
                    google: true,
                    password: '123456'
                }
    
                user = new User(data);
    
                user.password = user.hashPass(user.password) // Encrypt pass
                console.log(user);
    
                await user.save();
            }

            if (!user.status) return res.status(401).json({ msg: ERRORS.USER_BLOCKED });
    
            const token = await generateJWT(user.id);
    
            res.json({
                user,
                token
            })
        } catch (error) {
            console.log(error);
            res.status(401).json({ msg: ERRORS.INVALID_GOOGLE_TOKEN })
        }
    }
    
}

export default AuthController;
import { Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import User from '../model/user';
import ERRORS from '../errors/dicErrors';
import { generateJWT } from '../helpers';

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


}

export default AuthController;
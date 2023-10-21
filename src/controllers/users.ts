import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import User from '../model/user';
import { generateJWT } from '../helpers';
import ERRORS from '../errors/dicErrors';

class UsersController {

    getUsers = async(req:Request, res:Response) => {
        const { offset=0, limit=5 } = req.query;
        const query = { status: true };

        try {

            const [total, users] = await Promise.all([
                User.countDocuments(query),
                User.find(query)
                .skip(Number( offset ))
                .limit(Number( limit ))
            ])
            
            res.json({
                total,
                users
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: ERRORS.SYSTEM_ERROR
            });
        }
    }
    
    getUser = async(req:Request, res:Response) => {
        const {id} = req.params;

        try {
            
            const user = await User.findById(id);
    
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: ERRORS.SYSTEM_ERROR
            });
        }
    }
    
    createUser = async(req:Request, res:Response) => {
        const { google, created_at, role, status, img, ...data } = req.body;
        
        const user = new User(data);
        user.password = user.hashPass(data.password);
        
        // User save in DB
        await user.save();
        
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });
    }
    
    updateUser = async(req:Request, res:Response) => {
        const { status, google, password, email, role, created_at, id: uid, ...data } = req.body;
        const {id} = req.params;

        if( password ) { // Change pass
            const salt = bcrypt.genSaltSync();
            data.password = bcrypt.hashSync( password, salt );
        }

        const user = await User.findByIdAndUpdate(id, data, {new: true});

        res.json( user );
    }
    
    deleteUser = async(req:Request, res:Response) => {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, {status: false}, {new: true});
        
        res.json( user );
    } 
}

export default UsersController;
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
    
    postUser = async(req:Request, res:Response) => {
        const body = req.body;

        // Hashing pass
        const salt = bcrypt.genSaltSync();
        body.password = bcrypt.hashSync( body.password, salt );

        const user = new User(body);
        
        // User save in DB
        user.save();
        
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });
    }
    
    updateUser = async(req:Request, res:Response) => {
        const { status, google, password, role, created_at, ...rest } = req.body;
        const {id} = req.params;

        // Hashing pass
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync( password, salt );

        const user = await User.findByIdAndUpdate(id, rest, {new: true});

        res.json( user );
    }
    
    deleteUser = async(req:Request, res:Response) => {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, {status: false}, {new: true});
        
        res.json( user );
    } 
}

export default UsersController;
const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../model');
const { SYSTEM_ERROR } = require('../errors/dicErrors');
const { generateJWT, uploadImg } = require('../helpers');

const getUsers = async(req=request, res=response) => {
    try {
        const { limit=4, offset=0 } = req.query;
        const query = {status: true};
        
        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(offset)
                .limit(limit)
        ]);
     
        res.json({
            total, users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: SYSTEM_ERROR
        });
    }
}

const getUser = async(req=request, res=response) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);

        res.json(user)
        
    } catch (error) {
        console.log(error);
    }
}

const createUser = async(req=request, res=response) => {
    try {
        const { name, mail, password } = req.body;
        const user = new User({ name, mail, password }); // Modelo usuario
    
        // Constraseña encritada
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
        
        await user.save(); // Usuario guardado en la db

        // JWT
        const token = await generateJWT(user.id);
    
        res.status(201).json({
            user, 
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: SYSTEM_ERROR
        })
    }
}

const updateUser = async(req=request, res=response) => {
    try {
        const { google, mail, password, status, _id, role, ...rest } = req.body;
        const {userId} = req.params;

        if( password ) {
            // Constraseña actualizada
            const salt = bcrypt.genSaltSync();
            rest.password = bcrypt.hashSync( password, salt );
        }

        const user = await User.findByIdAndUpdate(userId, rest, {new:true} )

        res.json({
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: SYSTEM_ERROR
        })
    }
}

const deleteUser = async(req=request, res=response) => {
    try {
        const {userId} = req.params;
        const user = await User.findByIdAndUpdate(userId, {status: false}, {new: true});
        
        res.json({
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: SYSTEM_ERROR
        })
    }dbValidators
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}
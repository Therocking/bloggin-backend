const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../model');
const { SYSTEM_ERROR } = require('../errors/dicErrors');
const { generateJWT } = require('../helpers/generateJWT');

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

const createUser = async(req=request, res=response) => {
    try {
        const { name, mail, password } = req.body
        const user = new User({ name, mail, password }) // Modelo usuario
    
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
        const {google, mail, password, status, _id, ...rest} = req.body;
        const {id} = req.params;

        if( password ) {
            // Constraseña encritada
            const salt = bcrypt.genSaltSync();
            rest.password = bcrypt.hashSync( password, salt );
        }

        const user = await User.findByIdAndUpdate(id, rest, {new:true} )

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
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, {status: false}, {new: true});
        
        res.json({
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: SYSTEM_ERROR
        })
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}
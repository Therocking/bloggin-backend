const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../model');
const { SYSTEM_ERROR, USER_OR_PASS_INCORRECT } = require('../errors/dicErrors');
const { generateJWT } = require('../helpers/generateJWT');


const login = async(req=request, res=response) => {
    try {
        const {password, mail} = req.body;

        const user = await User.findOne({ mail });
        
        const validPassword = bcrypt.compareSync(password, user.password);
        if( !validPassword ) {
            return res.status(400).json({
                msg: USER_OR_PASS_INCORRECT
            });
        }

        const token = await generateJWT(user.id);
        console.log(req.user);

        res.json({
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: SYSTEM_ERROR
        });
    }
}

module.exports = {
    login
}
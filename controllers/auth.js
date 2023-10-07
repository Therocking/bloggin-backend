const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../model');
const { SYSTEM_ERROR, USER_OR_PASS_INCORRECT, INVALID_GOOGLE_TOKEN } = require('../errors/dicErrors');
const { generateJWT, verify } = require('../helpers');


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

const loginGoogle = async(req=request, res=response) => {
    try {
        const { googleToken } = req.body;
        const googleUser = await verify(googleToken); // Valida el googleToken

        const { name, email, picture } = googleUser;

        let user = await User.findOne({ mail: email });
        if( !user ) { // Si el usuario no existe se crea

            const data = {
                name,
                mail: email,
                img: picture,
                google: true,
                password: '123456'
            }
            user = new User( data );

            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync( user.password, salt )

            await user.save();
        }

        if( !user.status ) { // Si existe pero está status = false, no se le deja pasar
            return res.status(401).json({
                msg: 'Usuario bloqueado'
            });
        }

        // Genera un nuevo token
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: INVALID_GOOGLE_TOKEN
        })
    }
}

module.exports = {
    login,
    loginGoogle
}
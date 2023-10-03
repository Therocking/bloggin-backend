const JWT = require('jsonwebtoken');
const { WITHOUT_TOKEN, TOKEN_USER, ID_NOT_IN_USE, INVALID_TOKEN, TOKEN_EXPIRED } = require('../errors/dicErrors');
const { User } = require('../model');

const validJWT = async(req, res, next) => {
    try {
        
        const token = req.header('x-token');
    
        if( !token ) {
            return res.status(400).json({
                msg: WITHOUT_TOKEN
            });
        }
    
        const { uid } = await JWT.verify( token, process.env.SECRETJWT );
    
        const user = await User.findById(uid);
    
        if( !user ) {
            return res.status(400).json({
                msg: TOKEN_USER
            });
        }
    
        if( !user.status ) {
            return res.status(400).json({
                msg: ID_NOT_IN_USE
            });
        }
    
        req.user = user
        next();
    } catch (error) {
        console.log(error);
        if ( error.name === 'TokenExpiredError' ) {
            return res.status(401).json({
                msg: TOKEN_EXPIRED
            });
        }

        res.status(401).json({
            msg: INVALID_TOKEN
        });
    }
}

module.exports = {
    validJWT
}
const JWT = require('jsonwebtoken');
const { TOKEN_NOT_CREATED } = require('../errors/dicErrors');

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {

        const payload = { uid }

        JWT.sign(payload, process.env.SECRETJWT, {
            expiresIn: '6h'
        }, (err, token) => {
        
            if(err) {
                console.log(err);
                reject(TOKEN_NOT_CREATED);
            }else{
                resolve(token);
            }

        });
    }); 
}

module.exports = {
    generateJWT
}
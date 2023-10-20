import jwt from 'jsonwebtoken';

export const generateJWT = ( uid: string ) => {
    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETJWT || 'secret', {
            expiresIn: '6h'
        }, ( err, token ) => {

            if (err) {
                reject(err)
            }else{
                resolve(token)
            }
            
        });
    });
}
const { USER_WITHOU_PRIVILEGES } = require('../errors/dicErrors');

const isAdmin = async(req, res, next) => {
    const {status} = req.user;

    if( status !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: USER_WITHOU_PRIVILEGES
        })
    }

    next();
}

module.exports = {
    isAdmin
}
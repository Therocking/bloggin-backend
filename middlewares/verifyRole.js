const { USER_WITHOU_PRIVILEGES } = require('../errors/dicErrors');
const { ADMIN_ROLE } = require('../helpers/usersRoles');

const isAdmin = async(req, res, next) => {
    const {role} = req.user;

    if( role !== ADMIN_ROLE ) {
        return res.status(401).json({
            msg: USER_WITHOU_PRIVILEGES
        })
    }

    next();
}

module.exports = {
    isAdmin
}
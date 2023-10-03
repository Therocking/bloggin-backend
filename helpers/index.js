

const dbValidators = require('./db-validators')
const generateToken = require('./generateJWT')
const roles = require('./usersRoles')
const validGoogle = require('./valid-google')

module.exports = {
    ...dbValidators,
    ...generateToken,
    ...roles,
    ...validGoogle,
}
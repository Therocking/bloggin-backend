

const dbValidators = require('./db-validators')
const generateToken = require('./generateJWT')
const roles = require('./usersRoles')
const validGoogle = require('./valid-google')
const uploadFile = require('./upload-file')

module.exports = {
    ...dbValidators,
    ...generateToken,
    ...roles,
    ...validGoogle,
    ...uploadFile,
}
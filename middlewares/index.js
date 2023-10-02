

const validToken = require('./valid-jwt');
const valid_fields = require('./valid-fields');
const verifyRole = require('./verifyRole');

module.exports = {
    ...valid_fields,
    ...validToken,
    ...verifyRole,
}
const { Schema, model } = require('mongoose');
const { USER_ROLE } = require('../helpers/usersRoles');

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: USER_ROLE,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    img: {
        type: String,
        default: null
    }
});

UserSchema.methods.toJSON = function() {
    const { _id, __v, password, ...user} = this.toObject();
    user.uid = _id
    return user
}

module.exports = model('User', UserSchema)
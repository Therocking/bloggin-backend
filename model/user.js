const { Schema, model } = require('mongoose');
const { USER_ROLE } = require('../helpers/usersRoles');

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    mail: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: USER_ROLE,
        require
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
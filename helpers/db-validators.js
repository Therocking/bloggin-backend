const { User } = require('../model')
const { MAIL_IN_USE, ID_NOT_IN_USE } = require('../errors/dicErrors')


const isMailUniq = async( mail = '' ) => {
    const user = await User.findOne({ mail: mail })

    if( user ) throw new Error(MAIL_IN_USE)
}

const isUidUsed = async( id = '' ) => {
    const user = await User.findById(id);
    if( !user ) throw new Error(ID_NOT_IN_USE)
}

module.exports = {
    isMailUniq,
    isUidUsed,
}
const { User, Post } = require('../model')
const { MAIL_IN_USE, ID_NOT_IN_USE, USER_OR_PASS_INCORRECT } = require('../errors/dicErrors')


const isMailUniq = async( mail = '' ) => {
    const user = await User.findOne({ mail: mail })

    if( user ) throw new Error(MAIL_IN_USE)
}

const isUidUsed = async( id = '' ) => {
    const user = await User.findById(id);
    if( !user ) throw new Error(ID_NOT_IN_USE)
}

const isIdUsed = async( id = '' ) => {
    const post = await Post.findById(id);
    if( !post ) throw new Error(ID_NOT_IN_USE)
}

const isIdCommentUsed = async( id = '' ) => {
    const post = await Post.findById(id);
    return post.comments.map( comment =>  {
        if( !comment._id ) throw new Error(ID_NOT_IN_USE)
    })
}

const isValidUser = async( mail = '' ) => {
    const user = await User.findOne({ mail });

    if( !user || !user.status ) throw new Error(USER_OR_PASS_INCORRECT)
}

module.exports = {
    isMailUniq,
    isUidUsed,
    isIdUsed,
    isIdCommentUsed,
    isValidUser,
}
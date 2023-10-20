import ERRORS from '../errors/dicErrors';
import User from '../model/user';

// Valid uid
export const userIdNotExist = async( id: string ) => {
    const user = await User.findById(id);
    if( !user ) throw new Error(ERRORS.ID_NOT_IN_USE);
}

// Valid email
export const emailExist = async( mail: string ) => {
    const user = await User.findOne({ mail: mail });
    if( !user ) throw new Error(ERRORS.MAIL_OR_PASS_INCORRECT);
}
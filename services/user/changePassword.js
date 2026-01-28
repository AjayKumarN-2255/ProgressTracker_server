const User = require('../../models/User');
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const bcrypt = require('bcrypt');

async function changePassword(userId, payLoad) {

    const user = await User.findById(userId);

    if (!user) {
        throw new APIError(STATUS_CODES.NOT_FOUND, 'User not found');
    }

    if ((payLoad.password && !payLoad.new_password) || (!payLoad.password && payLoad.new_password)) {
        throw new APIError(
            STATUS_CODES.BAD_REQUEST,
            'Both current password and new password are required to update password'
        );
    }

    if (payLoad.password && payLoad.new_password) {
        const { password, new_password } = payLoad;
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new APIError(
                STATUS_CODES.BAD_REQUEST,
                'Current password is incorrect'
            );
        }
        user.password = await bcrypt.hash(new_password, 10);
    }
    
    await user.save();
}

module.exports = {
    changePassword
}
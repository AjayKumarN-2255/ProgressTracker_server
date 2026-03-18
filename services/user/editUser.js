const User = require('../../models/User');
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');

async function EditUser(userId, payLoad) {

    if (!Object.keys(payLoad).length) {
        throw new APIError(STATUS_CODES.BAD_REQUEST, "No data to update");
    }

    const allowedFields = ['name', 'email', 'designation'];
    const filteredPayload = {};

    Object.keys(payLoad).forEach((key) => {
        if (allowedFields.includes(key)) {
            filteredPayload[key] = payLoad[key];
        }
    });

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: filteredPayload },
        { new: true }
    );

    if (!updatedUser) {
        throw new APIError(STATUS_CODES.NOT_FOUND, "User not found");
    }

    return updatedUser;
}

module.exports = {
    EditUser
}
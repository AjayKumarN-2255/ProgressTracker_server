const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const { APIError } = require('../../shared/error/APIError');
const User = require('../../models/User');

async function getUser(req, res, next) {
    try {
        const { role, reqField, userId } = req.query;
        const filter = role ? { role } : {};


        const allowedFields = ['_id', 'name', 'email', 'role', 'designation', 'profile'];
        let selectedFields = '_id name';

        if (reqField) {
            const requested = reqField.split(' ');
            const filtered = requested.filter(f => allowedFields.includes(f));
            if (filtered.length) {
                selectedFields = filtered.join(' ');
            }
        }

        if (userId) {
            const user = await User.findById(userId, selectedFields);
            if (!user) {
                return next(new APIError(STATUS_CODES.NOT_FOUND, "user not exist"));
            }
            return res.status(STATUS_CODES.OK).json({
                success: true,
                message: "user detail fetched successfully",
                data: user,
            });
        }
        
        const users = await User.find(filter, selectedFields);

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: "user details fetched successfully",
            data: users,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUser
};

const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const User = require('../../models/User');

async function getUser(req, res, next) {
    try {
        const { role } = req.query;
        const filter = role ? { role } : {};

        const users = await User.find(filter, '_id name');

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

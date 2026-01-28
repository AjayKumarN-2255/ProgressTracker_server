const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const userService = require('../../services/user');


async function changePassword(req, res, next) {
    const userId = req.user.id;
    const id = req.params.id;
    if (userId.toString() !== id.toString()) {
        return next(new APIError(
            STATUS_CODES.FORBIDDEN,
            "You are not authorized to perform this action"
        ))
    }
    const payLoad = req.body;
    if (!payLoad) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, 'Request body is missing or empty'));
    }

    try {
        await userService.changePassword(userId, payLoad);
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: "Password changed successfully",
        })
    } catch (error) {
        next(error);
    }

}

module.exports = {
    changePassword
}
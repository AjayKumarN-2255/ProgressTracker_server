const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const userService = require('../../services/user');


async function updateProfileImage(req, res, next) {

    const userId = req.user.id;
    const paramId = req.params.id;

    if (userId !== paramId) {
        return next(new APIError(STATUS_CODES.FORBIDDEN, "You are not authorized to update this profile image."))
    }

    if (!req.file) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, "profile image required"))
    }

    const user = await userService.updateProfileImage(userId, req.file);

    return res.status(STATUS_CODES.OK).json({
        success: true,
        message: "profile image updated successfully",
        data: user
    })

}

module.exports = {
    updateProfileImage
}
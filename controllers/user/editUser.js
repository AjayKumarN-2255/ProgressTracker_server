const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const userService = require('../../services/user');

async function EditUser(req, res, next) {

    const { id } = req.params;
    const payLoad = req.body;
    if (!payLoad) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, "Request body is missing or empty"));
    }

    try {
        const user = await userService.EditUser(id, payLoad);

        res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    EditUser
}
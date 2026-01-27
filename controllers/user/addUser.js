const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const { validateWithSchema } = require('../../utils/schemaValidation');
const userSchema = require('../../validators/userSchema');
const userService = require('../../services/user');


async function AddUser(req, res, next) {

    const payload = req.body;
    const currentUserRole = req.user.role;
    const addedUserRole = req.body.role;
    if (!payload) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, 'Request body is missing or empty'));
    }
    const { error } = validateWithSchema(userSchema, payload);
    if (error) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, error.details[0].message));
    }

    if (addedUserRole === "admin" && currentUserRole !== "super-admin") {
        return next(new APIError(STATUS_CODES.FORBIDDEN, "Only super-admin can create an Admin user"));
    }

    try {
        const user = await userService.AddUser(payload);

        res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: 'User created successful',
            data: user
        });

    } catch (error) {
        next(error)
    }

}

module.exports = {
    AddUser
}
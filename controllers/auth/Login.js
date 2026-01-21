const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const loginSchema = require('../../validators/loginSchema');
const { validateWithSchema } = require('../../utils/schemaValidation');
const authService = require('../../services/auth');


async function Login(req, res, next) {
    const payload = req.body;
    if (!payload) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, 'Request body is missing or empty'));
    }
    const { error } = validateWithSchema(loginSchema, payload);
    if (error) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, error.details[0].message));
    }
    try {
        const { access_token, refresh_token, userWithoutPassword } = await authService.Login(payload);

        res.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        }).status(STATUS_CODES.OK).json({
            success: true,
            message: 'Login successful',
            accessToken: access_token,
            user: userWithoutPassword
        });

    } catch (error) {
        next(error)
    }
}

module.exports = {
    Login
}
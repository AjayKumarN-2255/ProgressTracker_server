const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const authService = require('../../services/auth');

async function refreshToken(req, res, next) {
    const refresh_token = req.cookies.refreshToken;

    if (!refresh_token) {
        return next(new APIError(STATUS_CODES.UNAUTHORIZED, 'Refresh token missing'));
    }

    try {
        const access_token = await authService.refreshToken(refresh_token);
        res.status(STATUS_CODES.OK).json({
            success: true,
            message: 'Access token refreshed successfully',
            accessToken: access_token
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    refreshToken
}
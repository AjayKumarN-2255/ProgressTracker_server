const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');

async function Logout(req, res, next) {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure:true,
            sameSite: 'Strict',
            path: '/'
        });

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        next(new APIError('Logout failed', STATUS_CODES.INTERNAL_SERVER_ERROR));
    }
}

module.exports = {
    Logout
};

const { verifyToken } = require('../utils/jwt');
const { STATUS_CODES } = require('../shared/constants/statusCodes');
const { APIError } = require('../shared/error/APIError');

function authenticate(req, res, next) {
    const token = req?.headers?.authorization?.split(' ')[1];
    
    if (!token) {
        return next(new APIError(STATUS_CODES.UNAUTHORIZED, 'No token provided'));
    }

    try {
        const payLoad = verifyToken(token, "access");
        req.user = payLoad;
        next()
    } catch (error) {
        next(error);
    }
}

module.exports = {
    authenticate
};
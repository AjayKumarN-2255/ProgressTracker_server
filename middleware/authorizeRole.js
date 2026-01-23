const { STATUS_CODES } = require('../shared/constants/statusCodes');
const { APIError } = require('../shared/error/APIError');

function authorizRole(...allowedRoles) {

    return function (req, res, next) {
        if (!req.user) {
            return next(new APIError(STATUS_CODES.UNAUTHORIZED, 'Unauthorized'));
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(new APIError(STATUS_CODES.FORBIDDEN, 'Forbidden: insufficient permissions'));
        }

        next();
    }
}


module.exports = {
    authorizRole
};
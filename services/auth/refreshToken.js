const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const { verifyToken, generateToken } = require('../../utils/jwt');

async function refreshToken(token) {

    try {
        const payload = verifyToken(token, "refresh");
        const { iat, exp, ...newPayload } = payload;
        const new_access_token = generateToken(newPayload, "access");
        if (!new_access_token) {
            throw new APIError(STATUS_CODES.INTERNAL_SERVER_ERROR, "Failed to generate access token");
        }
        return new_access_token;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    refreshToken
}
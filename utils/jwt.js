const jwt = require('jsonwebtoken');
const { STATUS_CODES } = require('../shared/constants/statusCodes');
const { APIError } = require('../shared/error/APIError');


function generateToken(payload, type = "access") {

    if (type === "access") {
        const access_token_secret = process.env.access_token_secret;
        return jwt.sign(payload, access_token_secret, { expiresIn: '1h' });
    } else if (type === "refresh") {
        const refresh_token_secret = process.env.refresh_token_secret;
        return jwt.sign(payload, refresh_token_secret, { expiresIn: '7d' });
    } else {
        throw new Error('Invalid token type');
    }

}

function verifyToken(token, type) {
    try {
        const secret = type === 'access' ? process.env.access_token_secret : process.env.refresh_token_secret;
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        throw new APIError(STATUS_CODES.UNAUTHORIZED,'Invalid or expired token');
    }
}

module.exports = {
    generateToken,
    verifyToken
}
const { authenticate } = require('./authenticate');
const { authorizRole } = require('./authorizeRole');


module.exports = {
    authenticate,
    authorizRole
}
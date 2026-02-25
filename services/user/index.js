const { AddUser } = require('./addUser');
const { changePassword } = require('./changePassword');
const { addSuperAdmin } = require('./createAdmin');


module.exports = {
    AddUser,
    addSuperAdmin,
    changePassword
}
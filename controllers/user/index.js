const { AddUser } = require('./addUser');
const { changePassword } = require('./changePassword');
const { getUser } = require('./getUser');
const { addSuperAdmin } = require('./createAdmin');



module.exports = {
    AddUser,
    getUser,
    addSuperAdmin,
    changePassword
}
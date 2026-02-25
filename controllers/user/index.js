const { AddUser } = require('./addUser');
const { changePassword } = require('./changePassword');
const { getUser } = require('./getUser');
const { addSuperAdmin } = require('./createAdmin');
const { updateProfileImage } = require('./updateProfileImage');


module.exports = {
    AddUser,
    getUser,
    addSuperAdmin,
    changePassword,
    updateProfileImage
}
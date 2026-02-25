const { AddUser } = require('./addUser');
const { changePassword } = require('./changePassword');
const { addSuperAdmin } = require('./createAdmin');
const { updateProfileImage } = require('./updateProfileImage');

module.exports = {
    AddUser,
    addSuperAdmin,
    changePassword,
    updateProfileImage
}
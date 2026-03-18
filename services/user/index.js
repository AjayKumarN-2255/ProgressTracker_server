const { AddUser } = require('./addUser');
const { EditUser } = require('./editUser');
const { changePassword } = require('./changePassword');
const { addSuperAdmin } = require('./createAdmin');
const { updateProfileImage } = require('./updateProfileImage');

module.exports = {
    AddUser,
    EditUser,
    addSuperAdmin,
    changePassword,
    updateProfileImage
}
const { AddUser } = require('./addUser');
const { EditUser } = require('./editUser');
const { changePassword } = require('./changePassword');
const { getUser } = require('./getUser');
const { addSuperAdmin } = require('./createAdmin');
const { updateProfileImage } = require('./updateProfileImage');


module.exports = {
    AddUser,
    getUser,
    EditUser,
    addSuperAdmin,
    changePassword,
    updateProfileImage
}
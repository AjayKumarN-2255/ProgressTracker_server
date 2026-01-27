const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const bcrypt = require('bcrypt');
const User = require('../../models/User');


async function AddUser(payLoad) {
    const { name, email, role, password, designation } = payLoad;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new APIError(STATUS_CODES.BAD_REQUEST, "A user with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        role,
        designation,
        password: hashedPassword
    })

    const savedUser = await newUser.save();
    const { password: pass, createdAt, updatedAt, __v, ...rest } = savedUser._doc;
    return rest;
}

module.exports = {
    AddUser
}
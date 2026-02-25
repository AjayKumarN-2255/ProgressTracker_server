const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const { saveImageBuffer, deleteLocalImage } = require('../../utils/fileMange');
const User = require('../../models/User');

async function updateProfileImage(userId, imageFile) {

    // const DUMMY_PROFILE = "/uploads/profile/dummy_profile.jpeg";

    if (!imageFile || !Buffer.isBuffer(imageFile.buffer)) {
        throw new APIError(STATUS_CODES.BAD_REQUEST, "Invalid image buffer");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new APIError(STATUS_CODES.NOT_FOUND, "user not found");
    }

    //  && user.profile != DUMMY_PROFILE
    if (user.profile) {
        deleteLocalImage(user.profile);
    }

    const result = saveImageBuffer(imageFile, user.name);
    
    user.profile = result.url;

    await user.save();

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profile
    };
}

module.exports = {
    updateProfileImage
}
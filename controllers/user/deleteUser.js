const User = require('../../models/User');
const Review = require('../../models/Review');
const Report = require('../../models/Report');
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');

async function DeleteUser(req, res, next) {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return next(new APIError(STATUS_CODES.NOT_FOUND, "User doesn't exist"));
        }
        
        if (user?.role === "employee") {
            await Review.deleteMany({ employee: id });
            await Report.deleteMany({ employeeId: id });
        }

        await User.findByIdAndDelete(id);

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: 'User deleted successfully'
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    DeleteUser
};
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const Designation = require('../../models/Designation');

async function getDesignationByRole(req, res, next) {
    try {
        const { role } = req.query;

        if (!role) {
            return next(
                new APIError(
                    STATUS_CODES.BAD_REQUEST,
                    "Role is required"
                )
            );
        }

        const allowedRoles = ["admin", "employee"];

        if (!allowedRoles.includes(role)) {
            return next(
                new APIError(
                    STATUS_CODES.BAD_REQUEST,
                    "Invalid role"
                )
            );
        }

        const designations = await Designation.find({ role })
            .select("name role")
            .sort({ name: 1 });

        res.status(STATUS_CODES.OK).json({
            success: true,
            data: designations
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getDesignationByRole
};
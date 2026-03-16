const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const Designation = require('../../models/Designation');

async function addDesignation(req, res, next) {
    try {
        const { name, role } = req.body || {};

        if (!name || !role) {
            return next(
                new APIError(
                    STATUS_CODES.BAD_REQUEST,
                    'designation name and role are required'
                )
            )
        }

        const allowedRoles = ["admin", "employee"]
        if (!allowedRoles.includes(role)) {
            return next(
                new APIError(
                    STATUS_CODES.BAD_REQUEST,
                    'Invalid user role'
                )
            )
        }

        const isExist = await Designation.findOne({
            name: name.trim(), role
        });

        if (isExist) {
            return next(
                new APIError(
                    STATUS_CODES.CONFLICT,
                    'Designation already added'
                )
            )
        }

        const desgn = await Designation.create({
            name,
            role
        });

        res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: 'Designation added successfully',
            data: desgn
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    addDesignation
};

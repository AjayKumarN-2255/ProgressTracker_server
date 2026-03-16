const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const Designation = require('../../models/Designation');

async function deleteDesignation(req, res, next) {
    try {
        const { id } = req.params;

        if (!id) {
            return next(
                new APIError(
                    STATUS_CODES.BAD_REQUEST,
                    'Designation id is required'
                )
            );
        }

        const designation = await Designation.findById(id);

        if (!designation) {
            return next(
                new APIError(
                    STATUS_CODES.NOT_FOUND,
                    'Designation not found'
                )
            );
        }

        await Designation.findByIdAndDelete(id);

        res.status(STATUS_CODES.OK).json({
            success: true,
            message: 'Designation deleted successfully'
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    deleteDesignation
};
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const Note = require('../../models/Note');

async function getNote(req, res, next) {
    try {
        const { type } = req.query;

        if (!type) {
            return next(
                new APIError(
                    STATUS_CODES.BAD_REQUEST,
                    'text and type are required'
                )
            )
        }

        const allowedTypes = ['milestones', 'patternsToAddress', 'memos'];
        if (!allowedTypes.includes(type)) {
            return next(
                new APIError(
                    STATUS_CODES.BAD_REQUEST,
                    'Invalid note type'
                )
            )
        }

        const notes = await Note.find({ type }).sort({ createdAt: -1 });

        res.status(STATUS_CODES.OK).json({
            success: true,
            message:"notes fetched successfully",
            data: notes
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getNote
};

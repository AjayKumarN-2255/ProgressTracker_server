const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const Note = require('../../models/Note');

async function addNote(req, res, next) {
    try {
        const { text, type } = req.body;

        if (!text || !type) {
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

        const note = await Note.create({
            text,
            type
        });

        res.status(STATUS_CODES.CREATED).json({
            message: 'Note added successfully',
            data: note
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    addNote
};

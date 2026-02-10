const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const Report = require('../../models/Report');
const Note = require('../../models/Note');

async function deleteNote(req, res, next) {
    try {
        const { id } = req.params;

        if (!id) {
            return next(new APIError(
                STATUS_CODES.BAD_REQUEST,
                'Note id is required'
            ))
        }

        const isNoteExist = await Report.exists({
            $or: [
                { 'milestones.noteId': id },
                { 'patternsToAddress.noteId': id },
                { 'memos.noteId': id }
            ]
        });

        if (isNoteExist) {
            return next(new APIError(
                STATUS_CODES.BAD_REQUEST,
                'This note is already associated with one or more reports.'
            ));
        }

        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return next(
                new APIError(
                    STATUS_CODES.NOT_FOUND,
                    'Note not found'
                )
            )
        }

        res.status(STATUS_CODES.OK).json({
            success: true,
            message: 'Note deleted successfully'
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    deleteNote
};

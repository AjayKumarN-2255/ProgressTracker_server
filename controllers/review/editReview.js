const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const { validateWithSchema } = require('../../utils/schemaValidation');
const reviewSchema = require('../../validators/reviewSchema');
const reviewService = require('../../services/review');

async function editReview(req, res, next) {

    const id = req.params.id;
    const payload = req.body;
    if (!payload) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, 'Request body is missing or empty'));
    }
    const { error } = validateWithSchema(reviewSchema, payload);
    if (error) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, error.details[0].message));
    }

    try {
        await reviewService.editReview(id, payload);
        res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: 'Review edited successfully'
        });

    } catch (error) {
        next(error)
    }
}

module.exports = {
    editReview
}
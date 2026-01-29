const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const reviewService = require('../../services/review');

async function getReviews(req, res, next) {
    try {

        const { userId } = req.query;
        const reviews = await reviewService.getReviews(userId);

        res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: 'Review fetched successfully',
            data: reviews
        });

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getReviews
}
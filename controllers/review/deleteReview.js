const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const Review = require('../../models/Review');
const mongoose = require('mongoose');

async function deleteReview(req, res, next) {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new APIError(STATUS_CODES.BAD_REQUEST, 'Invalid review ID'));
        }

        const review = await Review.findById(id);
        if (!review) {
            return next(new APIError(STATUS_CODES.NOT_FOUND, 'Review not found'));
        }

        await Review.findByIdAndDelete(id);

        res.status(STATUS_CODES.OK).json({
            success: true,
            message: 'Review deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    deleteReview
};

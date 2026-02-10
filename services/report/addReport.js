const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const Review = require('../../models/Review');
const Report = require('../../models/Report');


async function addReport(reviewId, payLoad) {

    const review = await Review.findById(reviewId);

    if (!review) {
        throw new APIError(
            STATUS_CODES.NOT_FOUND,
            'Review not found'
        );
    }

    if (review.status === 'completed') {
        throw new APIError(
            STATUS_CODES.FORBIDDEN,
            'Report for this review already added'
        );
    }

    const report = await Report.create({
        employeeId: payLoad.employeeId,
        reviewerId: payLoad.reviewerId,
        projectId: payLoad.projectId,
        reviewMonth: new Date(payLoad.reviewMonth),
        milestones: payLoad.milestones,
        patternsToAddress: payLoad.patternsToAddress,
        memos: payLoad.memos
    });
    review.status = 'completed';
    await review.save();

    return report;
}

module.exports = {
    addReport
}
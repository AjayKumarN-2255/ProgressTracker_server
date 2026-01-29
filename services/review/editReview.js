const Review = require('../../models/Review');
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');

async function editReview(id, payLoad) {

    const review = await Review.findById(id)
    if (!review) {
        throw new APIError(
            STATUS_CODES.NOT_FOUND,
            'Review not found'
        );
    }

    const { employees, reviewer, project, reviewMonth } = payLoad;

    const existingReview = await Review.findOne({
        employee: employees,
        project,
        reviewMonth,
        reviewer
    })
        .populate('employee', 'name')
        .populate('project', 'name');

    if (existingReview) {
        const employeeName = existingReview.employee?.name || 'Employee';
        const projectName = existingReview.project?.name || 'Project';

        throw new APIError(
            STATUS_CODES.CONFLICT,
            `Review already assigned for "${employeeName}" in project "${projectName}" for this month`
        );
    }

    review.reviewer = reviewer;
    review.project = project;
    review.reviewMonth = reviewMonth;

    await review.save();
    return review
}

module.exports = {
    editReview
}
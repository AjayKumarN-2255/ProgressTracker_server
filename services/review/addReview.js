const Review = require('../../models/Review');
const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');

async function addReview(payLoad) {

    const { employees, reviewer, project, reviewMonth } = payLoad;

    const existingReviews = await Review.find({
        employee: { $in: employees },
        project,
        reviewMonth
    }).populate('employee', 'name');

    if (existingReviews.length > 0) {
        const employeeNames = existingReviews
            .map(r => r.employee?.name)
            .join(', ');

        throw new APIError(
            STATUS_CODES.CONFLICT,
            `Review already assigned for this month for: ${employeeNames}`
        );
    }

    const reviewDocs = employees.map(empId => ({
        reviewer,
        employee: empId,
        project,
        reviewMonth,
        status: 'assigned',
    }));

    const createdReviews = await Review.insertMany(reviewDocs);
    return createdReviews;
}

module.exports = {
    addReview
}
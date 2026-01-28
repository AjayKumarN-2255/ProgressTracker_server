const Review = require('../../models/Review');


async function addReview(payLoad) {

    const { employees, reviewer, project, reviewMonth } = payLoad;

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
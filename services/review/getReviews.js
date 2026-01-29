const Review = require('../../models/Review');

async function getReviews(userId) {
    const filter = {};

    if (userId) {
        filter.reviewer = userId;
    }

    const review = await Review.find(filter)
        .select('-__v -createdAt -updatedAt')
        .populate('employee', 'name')
        .populate('reviewer', 'name')
        .populate('project', 'name')
        .sort({ createdAt: -1 });

    return review;
}

module.exports = {
    getReviews
}
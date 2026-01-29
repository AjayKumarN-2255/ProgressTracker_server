const Review = require('../../models/Review');

async function getReviews(userId, rId, status) {
    const filter = {};

    if (userId) {
        filter.reviewer = userId;
    }

    if (rId) {
        filter._id = rId;
    }

    if (status) {
        filter.status = status;
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
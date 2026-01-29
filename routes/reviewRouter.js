const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { authenticate, authorizRole } = require('../middleware');
const { addReview, getReviews, deleteReview, editReview } = require('../controllers/review');

router
    .route('/')
    .post(authenticate, authorizRole('admin', 'super-admin'), addReview)
    .get(authenticate, authorizRole('admin', 'super-admin'), getReviews);

router
    .route('/:id')
    .patch(authenticate, authorizRole('admin', 'super-admin'), editReview)
    .delete(authenticate, authorizRole('admin', 'super-admin'), deleteReview)
    .all(fourOhFiveHandler);

module.exports = router;
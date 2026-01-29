const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { authenticate, authorizRole } = require('../middleware');
const { addReview, getReviews, deleteReview } = require('../controllers/review');

router
    .route('/')
    .get(authenticate, authorizRole('admin', 'super-admin'), getReviews);

router
    .route('/')
    .post(authenticate, authorizRole('admin', 'super-admin'), addReview)

router
    .route('/:id')
    .delete(authenticate, authorizRole('admin', 'super-admin'), deleteReview)
    .all(fourOhFiveHandler);

module.exports = router;
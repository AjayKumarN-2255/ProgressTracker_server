const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { authenticate, authorizRole } = require('../middleware');
const { addReview } = require('../controllers/review');

router
    .route('/')
    .post(authenticate, authorizRole('admin', 'super-admin'), addReview)
    .all(fourOhFiveHandler);

module.exports = router;
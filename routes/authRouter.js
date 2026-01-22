const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { Login, refreshToken } = require('../controllers/auth');

router
    .route('/login')
    .post(Login)
    .all(fourOhFiveHandler);

router
    .route('/refresh')
    .post(refreshToken)
    .all(fourOhFiveHandler);

module.exports = router;
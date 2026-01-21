const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { Login, } = require('../controllers/auth');

router
    .route('/login')
    .post(Login)
    .all(fourOhFiveHandler);

module.exports = router;
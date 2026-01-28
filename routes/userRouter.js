const express = require('express');
const router = express.Router();
const { authenticate, authorizRole } = require('../middleware');
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { AddUser, changePassword, getUser } = require('../controllers/user');

router
    .route('/')
    .get(authenticate, authorizRole('admin', 'super-admin'), getUser)

router
    .route('/')
    .post(authenticate, authorizRole('admin', 'super-admin'), AddUser)
    .all(fourOhFiveHandler);

router
    .route('/change-password/:id')
    .patch(authenticate, changePassword)
    .all(fourOhFiveHandler);

module.exports = router;
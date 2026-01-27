const express = require('express');
const router = express.Router();
const { authenticate, authorizRole } = require('../middleware');
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { AddUser } = require('../controllers/user');

router
    .route('/')
    .post(authenticate, authorizRole('admin', 'super-admin'), AddUser)
    .all(fourOhFiveHandler);

module.exports = router;
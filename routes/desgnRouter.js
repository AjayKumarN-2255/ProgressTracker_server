const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { authenticate, authorizRole } = require('../middleware');
const { addDesignation } = require('../controllers/designation');

router
    .route('/')
    .post(authenticate, authorizRole('admin', 'super-admin'), addDesignation)
    .all(fourOhFiveHandler);


module.exports = router;
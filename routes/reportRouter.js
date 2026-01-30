const express = require('express');
const router = express.Router();
const { authenticate, authorizRole } = require('../middleware');
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { addReport } = require('../controllers/report');

router
    .route('/:id')
    .post(authenticate, authorizRole('admin', 'super-admin'), addReport)
    .all(fourOhFiveHandler);

module.exports = router;
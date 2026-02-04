const express = require('express');
const router = express.Router();
const { authenticate, authorizRole } = require('../middleware');
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { addReport, getReport, editReport } = require('../controllers/report');

router
    .route('/:id')
    .post(authenticate, authorizRole('admin', 'super-admin'), addReport);

router
    .route('/:id')
    .patch(authenticate, authorizRole('admin', 'super-admin'), editReport)
    .all(fourOhFiveHandler);

router
    .route('/')
    .get(authenticate, authorizRole('admin', 'employee', 'super-admin'), getReport)
    .all(fourOhFiveHandler);

module.exports = router;
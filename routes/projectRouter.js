const express = require('express');
const router = express.Router();
const { authenticate, authorizRole } = require('../middleware');
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { createProject } = require('../controllers/project');

router
    .route('/')
    .post(authenticate, authorizRole('admin', 'super-admin'), createProject)
    .all(fourOhFiveHandler);

module.exports = router;
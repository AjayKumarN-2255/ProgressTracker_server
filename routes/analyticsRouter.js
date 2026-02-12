const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { authenticate, authorizRole } = require('../middleware');
const { getGraphData } = require('../controllers/analytics');

router
    .route('/graph')
    .get(authenticate, authorizRole('admin', 'employee', 'super-admin'), getGraphData)
    .all(fourOhFiveHandler);

module.exports = router;
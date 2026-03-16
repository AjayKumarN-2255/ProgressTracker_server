const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { authenticate, authorizRole } = require('../middleware');
const { addDesignation, deleteDesignation, getDesignationByRole } = require('../controllers/designation');

router
    .route('/')
    .get(authenticate, authorizRole('admin', 'super-admin'), getDesignationByRole)
    .post(authenticate, authorizRole('admin', 'super-admin'), addDesignation)
    .all(fourOhFiveHandler);

router
    .route('/:id')
    .delete(authenticate, authorizRole('admin', 'super-admin'), deleteDesignation)
    .all(fourOhFiveHandler);


module.exports = router;
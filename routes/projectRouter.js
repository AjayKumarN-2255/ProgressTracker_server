const express = require('express');
const router = express.Router();
const { authenticate, authorizRole } = require('../middleware');
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { createProject, editProject, deleteProject, getAllProjects } = require('../controllers/project');

router
    .route('/')
    .get(authenticate, authorizRole('employee', 'admin', 'super-admin'), getAllProjects)
    .post(authenticate, authorizRole('admin', 'super-admin'), createProject)
    .all(fourOhFiveHandler);

router
    .route('/:id')
    .patch(authenticate, authorizRole('admin', 'super-admin'), editProject)
    .delete(authenticate, authorizRole('admin', 'super-admin'), deleteProject)
    .all(fourOhFiveHandler);


module.exports = router;
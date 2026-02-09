const express = require('express');
const router = express.Router();
const { authenticate, authorizRole } = require('../middleware');
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { addNote, getNote, deleteNote } = require('../controllers/note');

router
    .route('/')
    .post(authenticate, authorizRole('admin', 'super-admin'), addNote)
    .get(authenticate, authorizRole('admin', 'super-admin'), getNote);

router
    .route('/:id')
    .delete(authenticate, authorizRole('admin', 'super-admin'), deleteNote);

router.use(fourOhFiveHandler);

module.exports = router;

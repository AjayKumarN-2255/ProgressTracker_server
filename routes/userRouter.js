const express = require('express');
const router = express.Router();
const { authenticate, authorizRole } = require('../middleware');
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { upload } = require('../utils/multer');
const { AddUser, changePassword, getUser, addSuperAdmin, updateProfileImage, EditUser } = require('../controllers/user');

router
    .route('/')
    .get(authenticate, authorizRole('admin', 'super-admin'), getUser)

router
    .route('/')
    .post(authenticate, authorizRole('admin', 'super-admin'), AddUser)
    .all(fourOhFiveHandler);

router
    .route('/profile-image/:id')
    .patch(authenticate, authorizRole('super-admin', 'admin'), upload.single("image"), updateProfileImage)
    .all(fourOhFiveHandler);

router
    .route('/change-password/:id')
    .patch(authenticate, authorizRole('super-admin', 'admin', 'employee'), changePassword)
    .all(fourOhFiveHandler);

router
    .route('/:id')
    .patch(authenticate, authorizRole('admin', 'super-admin'), EditUser)
    .all(fourOhFiveHandler);

router
    .route('/add-super-admin')
    .post(addSuperAdmin);


module.exports = router;
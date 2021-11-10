const express = require('express')
const {registerUser, loginUser, logoutUser, getUserProfile, getAllUsers, getUserDetails, updateUsers, deleteUser} = require('../controller/authController');
const { isAuthenticatedUser, authorizeRoles } = require('../utils/isAuthenticated');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/admin/update/users/:id').put(isAuthenticatedUser, authorizeRoles('Admin'), updateUsers);
router.route('/logout').get(logoutUser);
router.route('/me').get( isAuthenticatedUser, getUserProfile );
router.route('/admin/allusers').get(isAuthenticatedUser, authorizeRoles('Admin'),getAllUsers);
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('Admin'), getUserDetails);
router.route('/admin/delete/user/:id').delete(isAuthenticatedUser, authorizeRoles('Admin'), deleteUser);

module.exports = router;
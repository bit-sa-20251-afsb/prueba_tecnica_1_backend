const express = require('express');
const router = express.Router();
const {getAllUsers, createUser, loginUser} = require('./../controllers/user.controller');

router.get('/get-users', getAllUsers);
router.post('/create-user', createUser);
router.post('/login-user', loginUser);

module.exports = router;
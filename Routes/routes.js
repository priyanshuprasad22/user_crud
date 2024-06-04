const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController.js');

router.get('/worko/user', userController.getUsers);
router.get('/worko/user/:userId', userController.getUserById);
router.post('/worko/user', userController.createUser);
router.put('/worko/user/:userId', userController.updateUser);
router.patch('/worko/user/:userId', userController.updateUser);
router.delete('/worko/user/:userId', userController.deleteUser);

module.exports = router;

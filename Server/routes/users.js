// routes/users.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Route for creating a new user
router.post('/', UserController.createUser);

// Route for retrieving all users
router.get('/', UserController.getAllUsers);

// Route for retrieving a user by ID
router.get('/:id', UserController.getUserById);


// Route for updating a user by ID
router.put('/:id', UserController.updateUserById);

// Route for deleting a user by ID
router.delete('/:id', UserController.deleteUserById);

// Route for retrieving a user by username
router.get('/username/:username', UserController.getUserByUsername);

module.exports = router;

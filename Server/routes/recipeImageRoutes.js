// routes/recipeImageRoutes.js

const express = require('express');
const router = express.Router();
const recipeImageController = require('../controllers/recipeImageController');
const upload = require('../middleware/upload');

// Route for uploading recipe image
router.post('/', upload.single('image'), recipeImageController.uploadImage);

module.exports = router;

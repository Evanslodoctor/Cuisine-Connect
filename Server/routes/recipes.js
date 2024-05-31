// routes/recipes.js
const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/RecipeController');
const multer = require('multer');

router.get('/', RecipeController.getAllRecipes);
router.get('/:id', RecipeController.getRecipeById);
router.put('/:id', RecipeController.updateRecipeById);
router.delete('/:id', RecipeController.deleteRecipeById);
// Define route for searching recipes
router.get('/search', RecipeController.searchRecipes);
// Route for rating a recipe
router.post("/:id/rate", RecipeController.rateRecipe);
// Route for adding a recipe to favorites
router.post("/:id/favorite", RecipeController.addToFavorites);


const upload = multer({ dest: 'uploads/' }); // Use the same multer configuration as in the controller

router.post('/recipes', upload.single('image'), RecipeController.createRecipe);

module.exports = router;

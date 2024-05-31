// routes/recipes.js
const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/RecipeController');

router.post('/', RecipeController.createRecipe);
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
router.put("/:id", RecipeController.updateRecipe);

module.exports = router;

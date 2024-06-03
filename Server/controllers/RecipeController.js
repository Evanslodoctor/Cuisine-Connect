const db = require("../models");
const Recipe = db.Recipe;
const Favorite = db.Favorite; // Import the Favorite model
const { Op } = require("sequelize");

exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for updating a recipe
exports.updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, ingredients, instructions, cuisineType, image } = req.body;

    // Check if the recipe exists
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Update the recipe
    await recipe.update({
      Title: title,
      Description: description,
      Ingredients: ingredients,
      Instructions: instructions,
      CuisineType: cuisineType,
      Image: image,
    });

    res.json({ message: 'Recipe updated successfully', recipe });
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    await recipe.update(req.body);
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    await recipe.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.rateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Update the average rating and number of ratings
    const newNumberOfRatings = recipe.NumberOfRatings + 1;
    const newAverageRating =
      (recipe.AverageRating * recipe.NumberOfRatings + parseFloat(rating)) / newNumberOfRatings;

    await recipe.update({
      AverageRating: newAverageRating,
      NumberOfRatings: newNumberOfRatings,
    });

    res.status(200).json({ message: "Recipe rated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addToFavorites = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if the recipe is already in favorites
    const existingFavorite = await Favorite.findOne({ where: { RecipeID: id } });
    if (existingFavorite) {
      return res.status(400).json({ message: "Recipe already in favorites" });
    }

    // Add the recipe to favorites
    await Favorite.create({ RecipeID: id, FavoriteDate: new Date() });

    res.status(201).json({ message: "Recipe added to favorites successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.searchRecipes = async (req, res) => {
  try {
    const { keyword } = req.query;
    const recipes = await Recipe.findAll({
      where: {
        [Op.or]: [
          { Title: { [Op.iLike]: `%${keyword}%` } }, // Case-insensitive search in Title
          { Description: { [Op.iLike]: `%${keyword}%` } }, // Case-insensitive search in Description
          // Add more fields to search if needed
        ],
      },
    });
    res.json(recipes);
  } catch (error) {
    console.error('Error searching recipes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getPopularRecipes = async (req, res) => {
  try {
    const popularRecipes = await Recipe.findAll({
      order: [["NumberOfRatings", "DESC"]], // Order by number of ratings in descending order
      limit: 10, // Limit to 10 recipes
    });
    res.json(popularRecipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

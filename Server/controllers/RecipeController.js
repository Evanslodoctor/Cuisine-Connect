// controllers/RecipeController.js
const db = require("../models");
const Recipe = db.Recipe;
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

exports.searchRecipes = async (req, res) => {
  try {
    const { keyword } = req.query;
    const recipes = await Recipe.findAll({
      where: {
        [Op.or]: [
          { Title: { [Op.iLike]: `%${keyword}%` } }, // Case-insensitive search
          { description: { [Op.iLike]: `%${keyword}%` } },
          // Add more fields to search if needed
        ],
      },
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPopularRecipes = async (req, res) => {
  try {
    const popularRecipes = await Recipe.findAll({
      order: [["views", "DESC"]], // Order by views in descending order
      limit: 10, // Limit to 10 recipes
    });
    res.json(popularRecipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

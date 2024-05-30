const multer = require('multer');
const path = require('path');

const db = require("../models");
const Recipe = db.Recipe;
const Favorite = db.Favorite;
const { Op } = require("sequelize");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

exports.createRecipe = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const {
        Title,
        Description,
        Ingredients,
        Instructions,
        CuisineType,
        DietaryTags,
        DifficultyLevel,
        CreationDate,
        UserUserID
      } = req.body;

      const newRecipe = await Recipe.create({
        Title,
        Description,
        Ingredients: JSON.parse(Ingredients),
        Instructions,
        CuisineType,
        DietaryTags,
        DifficultyLevel,
        CreationDate: new Date(CreationDate),
        UserUserID,
        Image: req.file ? req.file.path : null
      });

      res.status(201).json(newRecipe);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
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

exports.rateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

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

    const existingFavorite = await Favorite.findOne({ where: { RecipeID: id } });
    if (existingFavorite) {
      return res.status(400).json({ message: "Recipe already in favorites" });
    }

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
          { Title: { [Op.iLike]: `%${keyword}%` } },
          { Description: { [Op.iLike]: `%${keyword}%` } },
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
      order: [["NumberOfRatings", "DESC"]],
      limit: 10,
    });
    res.json(popularRecipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

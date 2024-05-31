// controllers/recipeImageController.js

const { Recipe } = require('../models');

const uploadImage = async (req, res) => {
  try {
    const { uniqueId } = req.body;
    const recipe = await Recipe.findOne({ where: { UniqueId: uniqueId } });

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if uploaded file exists
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Update recipe image field in database
    recipe.Image = req.file.path; // Assuming the file path is stored in req.file.path
    await recipe.save();

    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  uploadImage,
};

// controllers/FavoriteController.js
const db = require('../models');
const Favorite = db.Favorite;

exports.createFavorite = async (req, res) => {
  try {
    const newFavorite = await Favorite.create(req.body);
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.findAll();
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFavoriteById = async (req, res) => {
  try {
    const favorite = await Favorite.findByPk(req.params.id);
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFavoriteById = async (req, res) => {
  try {
    const favorite = await Favorite.findByPk(req.params.id);
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    await favorite.update(req.body);
    res.json(favorite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFavoriteById = async (req, res) => {
  try {
    const favorite = await Favorite.findByPk(req.params.id);
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    await favorite.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// routes/favorites.js
const express = require('express');
const router = express.Router();
const FavoriteController = require('../controllers/FavoriteController');

router.post('/', FavoriteController.createFavorite);
router.get('/', FavoriteController.getAllFavorites);
router.get('/:id', FavoriteController.getFavoriteById);
router.put('/:id', FavoriteController.updateFavoriteById);
router.delete('/:id', FavoriteController.deleteFavoriteById);

module.exports = router;

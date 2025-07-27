const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite.controller');
const { verifyToken } = require('../middlewares/auth.middlewares');

// Ajouter / Supprimer des favoris
router.post('/:webtoonId', verifyToken, favoriteController.addFavorite);
router.delete('/:webtoonId', verifyToken, favoriteController.removeFavorite);

// Voir sa bibliothèque
router.get('/', verifyToken, favoriteController.getMyFavorites);

// Voir la bibliothèque publique d’un utilisateur
router.get('/user/:userId', favoriteController.getUserFavorites);

module.exports = router;

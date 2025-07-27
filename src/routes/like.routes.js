const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like.controller');
const { verifyToken } = require('../middlewares/auth.middlewares');

// Ajouter un like
router.post('/:target/:id', verifyToken, likeController.addLike);

// Supprimer un like
router.delete('/:target/:id', verifyToken, likeController.removeLike);

// Voir le nombre de likes
router.get('/:target/:id', likeController.countLikes);

module.exports = router;

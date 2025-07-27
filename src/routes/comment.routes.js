const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const { verifyToken } = require('../middlewares/auth.middlewares');

// Ajouter un commentaire sur un webtoon ou un chapitre
router.post('/:target/:id', verifyToken, commentController.addComment);

// Lire les commentaires d’un webtoon ou d’un chapitre
router.get('/:target/:id', commentController.getComments);

// Supprimer un commentaire
router.delete('/:commentId', verifyToken, commentController.deleteComment);

module.exports = router;

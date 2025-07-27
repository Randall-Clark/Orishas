const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapter.controller');
const { verifyToken } = require('../middlewares/auth.middlewares');

// Création d’un chapitre par auteur connecté
router.post('/:webtoonId', verifyToken, chapterController.createChapter);

module.exports = router;

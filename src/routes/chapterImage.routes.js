const express = require('express');
const router = express.Router();
const chapterImageController = require('../controllers/chapterImage.controller');
const { verifyToken } = require('../middlewares/auth.middlewares');
const upload = require('../middlewares/upload.middleware');

// 📤 Upload d'images dans un chapitre
router.post(
  '/upload/:chapterId',
  verifyToken,
  upload.array('images', 20),
  chapterImageController.uploadImages
);

// 📖 Lecture des images d’un chapitre
router.get('/:chapterId', chapterImageController.getImagesByChapter);

// ❌ Suppression d’une image
router.delete('/:id', verifyToken, chapterImageController.deleteImage);

module.exports = router;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 📤 Upload de plusieurs images dans un chapitre
exports.uploadImages = async (req, res) => {
  const { chapterId } = req.params;
  const files = req.files;
  const user = req.user;

  try {
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      include: { webtoon: true }
    });

    if (!chapter) return res.status(404).json({ message: 'Chapitre introuvable' });

    if (chapter.webtoon.authorId !== user.userId && user.role !== 'ADMIN') {
      return res.status(403).json({ message: "Non autorisé à modifier ce chapitre" });
    }

    const lastImage = await prisma.chapterImage.findFirst({
      where: { chapterId },
      orderBy: { order: 'desc' }
    });

    let lastOrder = lastImage?.order || 0;
    const created = [];

    for (let i = 0; i < files.length; i++) {
      const image = await prisma.chapterImage.create({
        data: {
          chapterId,
          imageUrl: `/uploads/webtoons/${files[i].filename}`,
          order: lastOrder + i + 1
        }
      });
      created.push(image);
    }

    res.status(201).json({ message: 'Images uploadées', images: created });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// 📖 Lire toutes les images d’un chapitre
exports.getImagesByChapter = async (req, res) => {
  const { chapterId } = req.params;

  try {
    const images = await prisma.chapterImage.findMany({
      where: { chapterId },
      orderBy: { order: 'asc' }
    });

    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// ❌ Supprimer une image du chapitre
exports.deleteImage = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const image = await prisma.chapterImage.findUnique({
      where: { id },
      include: {
        chapter: { include: { webtoon: true } }
      }
    });

    if (!image) return res.status(404).json({ message: 'Image introuvable' });

    if (image.chapter.webtoon.authorId !== user.userId && user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Non autorisé à supprimer cette image' });
    }

    await prisma.chapterImage.delete({ where: { id } });
    res.status(200).json({ message: 'Image supprimée' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

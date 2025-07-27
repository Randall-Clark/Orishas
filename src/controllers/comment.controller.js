const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addComment = async (req, res) => {
  const { target, id } = req.params; // target = webtoon|chapter
  const { content } = req.body;
  const userId = req.user.userId;

  if (!content || content.trim() === '') {
    return res.status(400).json({ message: "Commentaire vide non autorisé" });
  }

  try {
    let data = {
      content,
      userId,
      createdAt: new Date()
    };

    if (target === 'webtoon') {
      const webtoon = await prisma.webtoon.findUnique({ where: { id } });
      if (!webtoon) return res.status(404).json({ message: "Webtoon introuvable" });
      data.webtoonId = id;

    } else if (target === 'chapter') {
      const chapter = await prisma.chapter.findUnique({ where: { id } });
      if (!chapter) return res.status(404).json({ message: "Chapitre introuvable" });
      data.chapterId = id;

    } else {
      return res.status(400).json({ message: "Cible invalide" });
    }

    const newComment = await prisma.comment.create({ data });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.getComments = async (req, res) => {
  const { target, id } = req.params;

  try {
    let comments = [];

    if (target === 'webtoon') {
      comments = await prisma.comment.findMany({
        where: { webtoonId: id },
        include: { user: { select: { username: true } } },
        orderBy: { createdAt: 'desc' }
      });
    } else if (target === 'chapter') {
      comments = await prisma.comment.findMany({
        where: { chapterId: id },
        include: { user: { select: { username: true } } },
        orderBy: { createdAt: 'desc' }
      });
    } else {
      return res.status(400).json({ message: "Cible invalide" });
    }

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const user = req.user;

  try {
    const comment = await prisma.comment.findUnique({ where: { id: commentId } });

    if (!comment) return res.status(404).json({ message: "Commentaire introuvable" });

    if (comment.userId !== user.userId && user.role !== 'ADMIN') {
      return res.status(403).json({ message: "Non autorisé à supprimer ce commentaire" });
    }

    await prisma.comment.delete({ where: { id: commentId } });
    res.status(200).json({ message: "Commentaire supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

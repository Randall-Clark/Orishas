const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 👍 Ajouter un like
exports.addLike = async (req, res) => {
  const { target, id } = req.params;
  const userId = req.user.userId;

  try {
    let data = { userId };

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

    // Vérifie s’il a déjà liké
    const alreadyLiked = await prisma.like.findFirst({
      where: {
        userId,
        webtoonId: data.webtoonId || undefined,
        chapterId: data.chapterId || undefined
      }
    });

    if (alreadyLiked) {
      return res.status(400).json({ message: "Déjà liké" });
    }

    const like = await prisma.like.create({ data });

    res.status(201).json({ message: "Like ajouté", like });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// 👎 Supprimer un like
exports.removeLike = async (req, res) => {
  const { target, id } = req.params;
  const userId = req.user.userId;

  try {
    let where = { userId };

    if (target === 'webtoon') where.webtoonId = id;
    else if (target === 'chapter') where.chapterId = id;
    else return res.status(400).json({ message: "Cible invalide" });

    const like = await prisma.like.findFirst({ where });

    if (!like) return res.status(404).json({ message: "Like non trouvé" });

    await prisma.like.delete({ where: { id: like.id } });

    res.status(200).json({ message: "Like supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// 📊 Nombre de likes
exports.countLikes = async (req, res) => {
  const { target, id } = req.params;

  try {
    let count = 0;

    if (target === 'webtoon') {
      count = await prisma.like.count({ where: { webtoonId: id } });
    } else if (target === 'chapter') {
      count = await prisma.like.count({ where: { chapterId: id } });
    } else {
      return res.status(400).json({ message: "Cible invalide" });
    }

    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

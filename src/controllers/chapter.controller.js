const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createChapter = async (req, res) => {
  const { webtoonId } = req.params;
  const { title } = req.body;
  const user = req.user;

  try {
    // Vérifie si le webtoon existe
    const webtoon = await prisma.webtoon.findUnique({ where: { id: webtoonId } });
    if (!webtoon) return res.status(404).json({ message: "Webtoon introuvable" });

    // Seul l'auteur du webtoon ou un admin peut créer un chapitre
    if (webtoon.authorId !== user.userId && user.role !== 'ADMIN') {
      return res.status(403).json({ message: "Non autorisé à créer un chapitre pour ce webtoon" });
    }

    // Calcule le numéro du prochain chapitre
    const lastChapter = await prisma.chapter.findFirst({
      where: { webtoonId },
      orderBy: { chapterNumber: 'desc' }
    });

    const chapterNumber = lastChapter ? lastChapter.chapterNumber + 1 : 1;

    const newChapter = await prisma.chapter.create({
      data: {
        title,
        chapterNumber,
        webtoonId
      }
    });

    res.status(201).json(newChapter);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

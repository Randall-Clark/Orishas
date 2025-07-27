const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ➕ Ajouter un webtoon en favori
exports.addFavorite = async (req, res) => {
  const { webtoonId } = req.params;
  const userId = req.user.userId;

  try {
    const webtoon = await prisma.webtoon.findUnique({ where: { id: webtoonId } });
    if (!webtoon) return res.status(404).json({ message: "Webtoon introuvable" });

    const existing = await prisma.favorite.findFirst({
      where: { userId, webtoonId }
    });

    if (existing) return res.status(400).json({ message: "Déjà dans les favoris" });

    const favorite = await prisma.favorite.create({
      data: { userId, webtoonId }
    });

    res.status(201).json({ message: "Ajouté aux favoris", favorite });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// ❌ Retirer un webtoon des favoris
exports.removeFavorite = async (req, res) => {
  const { webtoonId } = req.params;
  const userId = req.user.userId;

  try {
    const favorite = await prisma.favorite.findFirst({
      where: { userId, webtoonId }
    });

    if (!favorite) return res.status(404).json({ message: "Favori non trouvé" });

    await prisma.favorite.delete({ where: { id: favorite.id } });

    res.status(200).json({ message: "Favori retiré" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// 📖 Lister ses favoris
exports.getMyFavorites = async (req, res) => {
  const userId = req.user.userId;

  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        webtoon: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            coverUrl: true
          }
        }
      },
      orderBy: { id: 'desc' }
    });

    res.status(200).json(favorites.map(f => f.webtoon));
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// 🔍 Voir les favoris d’un autre utilisateur
exports.getUserFavorites = async (req, res) => {
  const { userId } = req.params;

  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        webtoon: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            coverUrl: true
          }
        }
      },
      orderBy: { id: 'desc' }
    });

    res.status(200).json(favorites.map(f => f.webtoon));
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

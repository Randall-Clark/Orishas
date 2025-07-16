const {PrismaClient} = require('@prisma/client');
const { use } = require('react');
const prisma = new PrismaClient();

exports.createWebtoon = async (req, res) => {

    const { title, description, coverUrl } = req.body;
    const authorId = req.user.id;

    try{
        const newWebtoon = await prisma.webtoon.create({
            data: {
                title,
                description,
                coverUrl,
                authorId,
            },
        });

        res.status(201).json(newWebtoon);
    } catch (error) {
        res.status(500).json({ message : 'Error while creating the webtoon', error: error.message });
    }
};

exports.getAllWebtoons = async (req, res) => {
    try{
        const webtoons = await prisma.webtoon.findMany({
            include: {
                author:{
                    select:{username: true}
                }
            },
            orderby: {createdAt: 'desc'}
        });
        res.status(200).json(webtoons);
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching webtoons', error: error.message });
    }
};

exports.getWebtoonById = async (req, res) => {
    const {id} = req.params;

    try{
        const webtoon = await prisma.webtoon.findUnique({
            where : {id},
            include: {
                pages : true,
                author:{
                    select: {username: true}
                },
                comments:true
            }
        });

        if (!webtoon) return res.status(404).json({ message: 'Webtoon not found' });

        res.status(200).json(webtoon);

    } catch (error) {
        res.status(500).json({ message: 'Error while fetching the webtoon', error: error.message });
    }
};

exports.updateWebtoon = async (req, res) => {
  const { id } = req.params;
  const { title, description, coverUrl, status } = req.body;
  const user = req.user;

  try {
    const webtoon = await prisma.webtoon.findUnique({ where: { id } });

    if (!webtoon) return res.status(404).json({ message: "Webtoon introuvable" });

    // Vérifie que l’utilisateur est l’auteur ou admin
    if (webtoon.authorId !== user.userId && user.role !== 'ADMIN') {
      return res.status(403).json({ message: "Non autorisé à modifier ce webtoon" });
    }

    const updatedWebtoon = await prisma.webtoon.update({
      where: { id },
      data: { title, description, coverUrl, status }
    });

    res.status(200).json(updatedWebtoon);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour", error: error.message });
  }
};

exports.deleteWebtoon = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const webtoon = await prisma.webtoon.findUnique({ where: { id } });

    if (!webtoon) return res.status(404).json({ message: "Webtoon introuvable" });

    if (webtoon.authorId !== user.userId && user.role !== 'ADMIN') {
      return res.status(403).json({ message: "Non autorisé à supprimer ce webtoon" });
    }

    await prisma.webtoon.delete({ where: { id } });

    res.status(200).json({ message: "Webtoon supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
  }
};

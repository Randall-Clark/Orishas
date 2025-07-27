const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json()); //Allow JSON body parsing
app.use(express.urlencoded({ extended: true })); //Forms parsing

app.use(cors({
  origin: 'http://localhost:3001', // ou 3000 selon ton front
  credentials: true
}));


const authRoutes = require('./routes/auth.routes');
const webtoonRoutes = require('./routes/webtoon.routes');
const chapterRoutes = require('./routes/chapter.routes');
const chapterImageRoutes = require('./routes/chapterImage.routes');
const commentRoutes = require('./routes/comment.routes');
const likeRoutes = require('./routes/like.routes');
const favoriteRoutes = require('./routes/favorite.routes');



app.use('/api/favorites', favoriteRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/chapter-images', chapterImageRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/webtoons', webtoonRoutes);
app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API OrishaScan !');
});

module.exports = app;
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); //Enable CORS for all routes
app.use(express.json()); //Allow JSON body parsing
app.use(express.urlencoded({ extended: true })); //Forms parsing
//app.use(cookieParser()); //Cookie parsing

// Routes (à connecter plus tard)
const authRoutes = require('./routes/auth.routes');
// ex: app.use('/api/users', require('./routes/user.routes'));
app.use('/api/auth', authRoutes);

// ex: app.use('/api/webtoons', require('./routes/webtoon.routes'));

app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API OrishaScan !');
});

module.exports = app;
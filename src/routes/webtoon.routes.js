const express = require('express');
const router = express.Router();
const webtoonController = require('../controllers/webtoon.controller');
const { verifyToken, requireRole } = require('../middlewares/auth.middleware');

router.get('/', webtoonController.getAllWebtoons);
router.get('/:id', webtoonController.getWebtoonById);

router.post('/', verifyToken, requireRole('AUTHOR'), webtoonController.createWebtoon);

router.put('/:id', verifyToken, webtoonController.updateWebtoon);
router.delete('/:id', verifyToken, webtoonController.deleteWebtoon);


module.exports = router;
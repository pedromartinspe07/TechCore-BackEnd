const express = require('express');
const router = express.Router();
const Noticia = require('../models/Noticia');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || '04181818';

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch {
    return res.status(403).json({ mensagem: 'Token inválido' });
  }
}

router.get('/noticias', autenticarToken, async (req, res) => {
  try {
    const noticias = await Noticia.find().sort({ data: -1 }).limit(20);
    res.status(200).json(noticias);
  } catch (erro) {
    console.error('Erro ao buscar notícias:', erro);
    res.status(500).json({ mensagem: 'Erro interno ao buscar notícias' });
  }
});

module.exports = router;

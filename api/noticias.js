const express = require('express');
const router = express.Router();
const Noticia = require('../models/Noticia');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || '04181818';

// Middleware para validar token JWT
function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // extrai só o token (ignora 'Bearer')

  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded; // se quiser usar dados do token depois
    next();
  } catch (err) {
    return res.status(403).json({ mensagem: 'Token inválido' });
  }
}

// Rota protegida para buscar notícias
router.get('/noticias', autenticarToken, async (req, res) => {
  try {
    const noticias = await Noticia.find();
    res.status(200).json(noticias);
  } catch (erro) {
    console.error('Erro ao buscar notícias:', erro);
    res.status(500).json({ mensagem: 'Erro interno ao buscar notícias' });
  }
});

module.exports = router;

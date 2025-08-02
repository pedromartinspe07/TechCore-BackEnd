const express = require('express');
const router = express.Router();
const Noticia = require('../models/Noticia');
const Comentario = require('../models/Comentario');
const Resposta = require('../models/Resposta');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || '04181818';

// Middleware para validar token
function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Suporta "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ mensagem: 'Token inválido' });
  }
}

router.use(autenticarToken);

// Rota teste
router.get('/', (req, res) => {
  res.send('🌐 API TechCore rodando com sucesso! - Rota pública');
  console.log('🌐 API TechCore rodando com sucesso! - Rota pública');
});

// Rotas notícias
router.get('/noticias', async (req, res) => {
  try {
    const noticias = await Noticia.find();
    res.status(200).json(noticias);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar notícias' });
  }
});

router.get('/noticias/:noticiaId', async (req, res) => {
  try {
    const noticia = await Noticia.findById(req.params.noticiaId);
    if (!noticia) return res.status(404).json({ mensagem: 'Notícia não encontrada' });
    res.status(200).json(noticia);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar notícia' });
  }
});

// Rotas comentários
router.get('/noticias/:noticiaId/comentarios', async (req, res) => {
  try {
    const comentarios = await Comentario.find({ noticia: req.params.noticiaId });
    res.status(200).json(comentarios);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar comentários' });
  }
});

router.get('/noticias/:noticiaId/comentarios/:comentarioId', async (req, res) => {
  try {
    const comentario = await Comentario.findById(req.params.comentarioId);
    if (!comentario) return res.status(404).json({ mensagem: 'Comentário não encontrado' });
    res.status(200).json(comentario);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar comentário' });
  }
});

// Rotas respostas
router.get('/noticias/:noticiaId/comentarios/:comentarioId/respostas', async (req, res) => {
  try {
    const respostas = await Resposta.find({ comentario: req.params.comentarioId });
    res.status(200).json(respostas);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar respostas' });
  }
});

router.get('/noticias/:noticiaId/comentarios/:comentarioId/respostas/:respostaId', async (req, res) => {
  try {
    const resposta = await Resposta.findById(req.params.respostaId);
    if (!resposta) return res.status(404).json({ mensagem: 'Resposta não encontrada' });
    res.status(200).json(resposta);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar resposta' });
  }
});

module.exports = router;

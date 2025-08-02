const express = require('express');
const router = express.Router();
const Noticia = require('../models/Noticia');
const Comentario = require('../models/Comentario');
const Resposta = require('../models/Resposta');
const mongoose = require('mongoose'); // Para validar ObjectId

// Rota para testar servidor
router.get('/', (req, res) => {
  res.send('🌐 API TechCore rodando com sucesso! - Rota pública');
  console.log('🌐 API TechCore rodando com sucesso! - Rota pública');
});

// Validar ObjectId
function validarObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

router.get('/noticias', async (req, res) => {
  try {
    const noticias = await Noticia.find();
    res.status(200).json(noticias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao buscar notícias' });
  }
});

router.get('/noticias/:noticiaId', async (req, res) => {
  const { noticiaId } = req.params;
  if (!validarObjectId(noticiaId)) return res.status(400).json({ mensagem: 'ID de notícia inválido' });

  try {
    const noticia = await Noticia.findById(noticiaId);
    if (!noticia) return res.status(404).json({ mensagem: 'Notícia não encontrada' });
    res.status(200).json(noticia);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao buscar notícia' });
  }
});

router.get('/noticias/:noticiaId/comentarios', async (req, res) => {
  const { noticiaId } = req.params;
  if (!validarObjectId(noticiaId)) return res.status(400).json({ mensagem: 'ID de notícia inválido' });

  try {
    const comentarios = await Comentario.find({ noticia: noticiaId });
    res.status(200).json(comentarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao buscar comentários' });
  }
});

router.get('/noticias/:noticiaId/comentarios/:comentarioId', async (req, res) => {
  const { comentarioId } = req.params;
  if (!validarObjectId(comentarioId)) return res.status(400).json({ mensagem: 'ID de comentário inválido' });

  try {
    const comentario = await Comentario.findById(comentarioId);
    if (!comentario) return res.status(404).json({ mensagem: 'Comentário não encontrado' });
    res.status(200).json(comentario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao buscar comentário' });
  }
});

router.get('/noticias/:noticiaId/comentarios/:comentarioId/respostas', async (req, res) => {
  const { comentarioId } = req.params;
  if (!validarObjectId(comentarioId)) return res.status(400).json({ mensagem: 'ID de comentário inválido' });

  try {
    const respostas = await Resposta.find({ comentario: comentarioId });
    res.status(200).json(respostas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao buscar respostas' });
  }
});

router.get('/noticias/:noticiaId/comentarios/:comentarioId/respostas/:respostaId', async (req, res) => {
  const { respostaId } = req.params;
  if (!validarObjectId(respostaId)) return res.status(400).json({ mensagem: 'ID de resposta inválido' });

  try {
    const resposta = await Resposta.findById(respostaId);
    if (!resposta) return res.status(404).json({ mensagem: 'Resposta não encontrada' });
    res.status(200).json(resposta);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao buscar resposta' });
  }
});

module.exports = router;

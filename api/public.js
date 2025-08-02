const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Noticia = require('../../models/Noticia');
const Comentario = require('../../models/Comentario');
const Resposta = require('../../models/Resposta');

// Utilitário: valida se um ID é um ObjectId válido
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Middleware para validar ObjectId em rotas dinâmicas
function validarId(paramName) {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!isValidObjectId(id)) {
      return res.status(400).json({ mensagem: `ID de ${paramName} inválido.` });
    }
    next();
  };
}

// Rota de status da API
router.get('/', (req, res) => {
  console.log('🌐 API pública acessada');
  res.send('🌐 API TechCore rodando com sucesso! - Rota pública');
});

// Buscar todas as notícias
router.get('/noticias', async (req, res) => {
  try {
    const noticias = await Noticia.find().sort({ data: -1 });
    res.status(200).json(noticias);
  } catch (err) {
    console.error('Erro ao buscar notícias:', err);
    res.status(500).json({ mensagem: 'Erro ao buscar notícias.' });
  }
});

// Buscar uma notícia específica
router.get('/noticias/:noticiaId', validarId('noticiaId'), async (req, res) => {
  try {
    const noticia = await Noticia.findById(req.params.noticiaId);
    if (!noticia) return res.status(404).json({ mensagem: 'Notícia não encontrada.' });
    res.status(200).json(noticia);
  } catch (err) {
    console.error('Erro ao buscar notícia:', err);
    res.status(500).json({ mensagem: 'Erro ao buscar notícia.' });
  }
});

// Buscar comentários de uma notícia
router.get('/noticias/:noticiaId/comentarios', validarId('noticiaId'), async (req, res) => {
  try {
    const comentarios = await Comentario.find({ noticia: req.params.noticiaId }).sort({ createdAt: -1 });
    res.status(200).json(comentarios);
  } catch (err) {
    console.error('Erro ao buscar comentários:', err);
    res.status(500).json({ mensagem: 'Erro ao buscar comentários.' });
  }
});

// Buscar um comentário específico
router.get('/noticias/:noticiaId/comentarios/:comentarioId', validarId('comentarioId'), async (req, res) => {
  try {
    const comentario = await Comentario.findById(req.params.comentarioId);
    if (!comentario) return res.status(404).json({ mensagem: 'Comentário não encontrado.' });
    res.status(200).json(comentario);
  } catch (err) {
    console.error('Erro ao buscar comentário:', err);
    res.status(500).json({ mensagem: 'Erro ao buscar comentário.' });
  }
});

// Buscar respostas de um comentário
router.get('/noticias/:noticiaId/comentarios/:comentarioId/respostas', validarId('comentarioId'), async (req, res) => {
  try {
    const respostas = await Resposta.find({ comentario: req.params.comentarioId }).sort({ createdAt: -1 });
    res.status(200).json(respostas);
  } catch (err) {
    console.error('Erro ao buscar respostas:', err);
    res.status(500).json({ mensagem: 'Erro ao buscar respostas.' });
  }
});

// Buscar uma resposta específica
router.get('/noticias/:noticiaId/comentarios/:comentarioId/respostas/:respostaId', validarId('respostaId'), async (req, res) => {
  try {
    const resposta = await Resposta.findById(req.params.respostaId);
    if (!resposta) return res.status(404).json({ mensagem: 'Resposta não encontrada.' });
    res.status(200).json(resposta);
  } catch (err) {
    console.error('Erro ao buscar resposta:', err);
    res.status(500).json({ mensagem: 'Erro ao buscar resposta.' });
  }
});

module.exports = router;

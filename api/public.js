// api/public.js

const express = require('express');
const router = express.Router();
const Noticia = require('../models/Noticia');
const Comentario = require('../models/Comentario');
const Resposta = require('../models/Resposta');
const jwt = require('jsonwebtoken'); //importa o jwt
const JWT_SECRET = process.env.JWT_SECRET || '04181818'; //segredo do JWT

// Middleware para validar token (exemplo básico)
function autenticarToken(req, res, next) {  //função para validar o token
  const token = req.headers['authorization']; //pega o token do header
  const decoded = jwt.verify(token, JWT_SECRET); //verifica se o token é válido
  console.log(decoded);
  next(); //se o token for válido, passa para a próxima função
}

router.use(autenticarToken); //usa o middleware para validar o token
router.use(autenticarToken); //usa o middleware para validar o token

router.get('/', (req, res) => { //rota para testar servidor
  res.send('🌐 API TechCore rodando com sucesso! - Rota pública'); //retorna mensagem de sucesso
  console.log('🌐 API TechCore rodando com sucesso! - Rota pública'); //console.log para testar
});

router.get('/noticias', async (req, res) => { //rota para buscar notícias
  const noticias = await Noticia.find(); //busca todas as notícias no banco de dados
  res.status(200).json(noticias); //retorna as notícias em formato JSON
  console.log(noticias); //console.log para testar
});

router.get('/noticias/:id', async (req, res) => { //rota para buscar notícia por id
  const noticia = await Noticia.findById(req.params.id); //busca a notícia por id
  res.status(200).json(noticia); //retorna a notícia em formato JSON
  console.log(noticia); //console.log para testar
});


router.get('/noticias/:id/comentarios', async (req, res) => { //rota para buscar comentários de uma notícia
  const comentarios = await Comentario.find({ noticia: req.params.id }); //busca todos os comentários da notícia por id
  res.status(200).json(comentarios); //retorna os comentários em formato JSON
  console.log(comentarios); //console.log para testar
});

router.get('/noticias/:id/comentarios/:id', async (req, res) => { //rota para buscar comentário por id
  const comentario = await Comentario.findById(req.params.id); //busca o comentário por id
  res.status(200).json(comentario); //retorna o comentário em formato JSON
  console.log(comentario); //console.log para testar
});

router.get('/noticias/:id/comentarios/:id/respostas', async (req, res) => { //rota para buscar respostas de um comentário
  const respostas = await Resposta.find({ comentario: req.params.id }); //busca todas as respostas do comentário por id
  res.status(200).json(respostas); //retorna as respostas em formato JSON
  console.log(respostas); //console.log para testar
});

router.get('/noticias/:id/comentarios/:id/respostas/:id', async (req, res) => { //rota para buscar resposta por id
  const resposta = await Resposta.findById(req.params.id); //busca a resposta por id
  res.status(200).json(resposta); //retorna a resposta em formato JSON
  console.log(resposta); //console.log para testar
});

module.exports = router;
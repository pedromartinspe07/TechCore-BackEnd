const express = require('express');
const router = express.Router();
const Noticia = require('../models/Noticia');
const jwt = require('jsonwebtoken'); //importa o jwt
const JWT_SECRET = process.env.JWT_SECRET || '04181818'; //segredo do JWT

// Middleware para validar token (exemplo básico)
function autenticarToken(req, res, next) {  //função para validar o token
  const token = req.headers['authorization']; //pega o token do header
  const decoded = jwt.verify(token, JWT_SECRET); //verifica se o token é válido
  console.log(decoded);
  console.log(token);
  console.log(req.headers);
  console.log(req.headers['authorization']);
  console.log(req.headers['authorization'].split(' ')[1]);
  console.log(req.headers['authorization'].split(' ')[1].split('.')[1]);
  console.log(req.headers['authorization'].split(' ')[1].split('.')[1].split('.')[1]);
  console.log(req.headers['authorization'].split(' ')[1].split('.')[1].split('.')[1].split('.')[1]);
  console.log(req.headers['authorization'].split(' ')[1].split('.')[1].split('.')[1].split('.')[1].split('.')[1]);
  console.log(req.headers['authorization'].split(' ')[1].split('.')[1].split('.')[1].split('.')[1].split('.')[1].split('.')[1]);
  console.log(req.headers['authorization'].split(' ')[1].split('.')[1].split('.')[1].split('.')[1].split('.')[1].split('.')[1].split('.')[1]);
  console.log(req.headers['authorization'].split(' ')[1].split('.')[1].split('.')[1].split('.')[1].split('.')[1].split('.')[1].split('.')[1].split('.')[1]);

  if (!token) { //se não tiver token, retorna erro 401
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  // Aqui você deve verificar se o token é válido (ex: usando JWT)
  // Exemplo simplificado (NÃO use isso em produção diretamente)
  if (token !== '04181818') { //se o token não for o mesmo, retorna erro 403
    return res.status(403).json({ mensagem: 'Token inválido' });
  }

  next(); //se o token for válido, passa para a próxima função
}

// Rota protegida para retornar notícias
router.get('/noticias', autenticarToken, async (req, res) => { //rota para buscar notícias
  try {
    const noticias = await Noticia.find(); //busca todas as notícias no banco de dados
    res.status(200).json(noticias); //retorna as notícias em formato JSON
    console.log(noticias);
    console.log(noticias.length);
    console.log(noticias[0]);
    console.log(noticias[0].titulo);
    console.log(noticias[0].conteudo);
    console.log(noticias[0].categoria);
    console.log(noticias[0].imagemCapa);
    console.log(noticias[0].autor);
    console.log(noticias[0].data);
    console.log(noticias[0].id);
    console.log(noticias[0].status);
    console.log(noticias[0].createdAt);
    console.log(noticias[0].updatedAt);
    console.log(noticias[0].__v);
    console.log(noticias[0].__id);
    console.log(noticias[0].__id.toString());
    console.log(noticias[0].__id.toString().length);
    console.log(noticias[0].__id.toString().length > 24);
    console.log(noticias[0].__id.toString().length > 24 ? noticias[0].__id.toString().substring(0, 24) : noticias[0].__id.toString());
    console.log(noticias[0].__id.toString().length > 24 ? noticias[0].__id.toString().substring(0, 24) : noticias[0].__id.toString());
  } catch (erro) {
    console.error('Erro ao buscar notícias:', erro); //se houver erro, retorna erro 500
    res.status(500).json({ mensagem: 'Erro interno ao buscar notícias' }); //retorna mensagem de erro
    console.log(erro);
    console.log(erro.message);
    console.log(erro.stack);
    console.log(erro.name);
    console.log(erro.code);
    console.log(erro.status);
    console.log(erro.errors);
    console.log(erro.message);
  }
});

module.exports = router;


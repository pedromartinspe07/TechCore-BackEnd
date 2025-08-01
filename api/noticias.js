const express = require('express');
const router = express.Router();
const Noticia = require('../models/Noticia');

// Middleware para validar token (exemplo básico)
function autenticarToken(req, res, next) {  //função para validar o token
  const token = req.headers['authorization']; //pega o token do header

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
  } catch (erro) {
    console.error('Erro ao buscar notícias:', erro); //se houver erro, retorna erro 500
    res.status(500).json({ mensagem: 'Erro interno ao buscar notícias' }); //retorna mensagem de erro
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Noticia = require('../models/Noticia');
const { redisClient } = require('../utils/redisClient');

// Middleware opcional para lidar com cache genérico (reutilizável no futuro)
async function getFromCacheOrFetch(key, fetchFunction, ttl = 600) {
  const cached = await redisClient.get(key);
  if (cached) {
    console.log(`🔵 [CACHE HIT] ${key}`);
    return JSON.parse(cached);
  }

  const data = await fetchFunction();
  await redisClient.setEx(key, ttl, JSON.stringify(data));
  console.log(`🟢 [CACHE MISS] ${key} - Dados armazenados no Redis`);
  return data;
}

// Rota para buscar todas as notícias (com cache Redis)
router.get('/noticias', async (req, res) => {
  const cacheKey = 'noticias:all';

  try {
    const noticias = await getFromCacheOrFetch(cacheKey, async () => {
      return await Noticia.find().sort({ data: -1 });
    });

    return res.status(200).json(noticias);
  } catch (error) {
    console.error('❌ Erro ao buscar notícias:', error.message);
    return res.status(500).json({ mensagem: 'Erro interno ao buscar notícias.' });
  }
});

module.exports = router;

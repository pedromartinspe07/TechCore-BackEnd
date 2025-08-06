const express = require('express');
const router = express.Router();
const Noticia = require('../models/Noticia');
const { redisClient } = require('../utils/redisClient');

async function getFromCacheOrFetch(key, fetchFunction, ttl = 600) {
  try {
    const cached = await redisClient.get(key);
    if (cached) {
      console.log(`🔵 [CACHE HIT] ${key}`);
      return JSON.parse(cached);
    }

    const data = await fetchFunction();
    await redisClient.setEx(key, ttl, JSON.stringify(data));
    console.log(`🟢 [CACHE MISS] ${key} - Dados armazenados no Redis`);
    return data;
  } catch (error) {
    console.error(`❌ Erro no cache para ${key}:`, error);
    throw error;
  }
}

router.get('/noticias', async (req, res) => {
  const cacheKey = 'noticias:all';

  try {
    const noticias = await getFromCacheOrFetch(cacheKey, async () => {
      return await Noticia.find().sort({ data: -1 });
    });

    return res.status(200).json(Array.isArray(noticias) ? noticias : []);
  } catch (error) {
    console.error('❌ Erro ao buscar notícias:', error);
    return res.status(500).json({ mensagem: 'Erro interno ao buscar notícias.' });
  }
});

module.exports = router;

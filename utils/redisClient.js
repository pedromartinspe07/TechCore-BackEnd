const redis = require('redis');

const { REDIS_URL } = process.env;

if (!REDIS_URL) {
  console.warn('⚠️ REDIS_URL não definida.');
}

const redisClient = redis.createClient({
  url: REDIS_URL,
  legacyMode: false
});

redisClient.on('error', (err) => {
  console.error('❌ Erro na conexão com o Redis:', err);
});

async function connectRedis() {
  if (!redisClient.isOpen) {
    try {
      await redisClient.connect();
      console.log('✅ Redis conectado com sucesso.');
    } catch (err) {
      console.error('❌ Falha ao conectar ao Redis:', err);
    }
  }
}

module.exports = {
  redisClient,
  connectRedis
};

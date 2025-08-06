// redisClient.js

const redis = require('redis');

// Certifique-se de que REDIS_URL esteja definida no .env
const { REDIS_URL } = process.env;

if (!REDIS_URL) {
  console.warn('⚠️ REDIS_URL não definida.');
}

// Criação do cliente Redis usando a URL de conexão
const redisClient = redis.createClient({
  url: REDIS_URL,       // Ex: redis://localhost:6379
  legacyMode: false     // Apenas se você quiser usar Promises modernas (recomendado)
});

// Evento de erro
redisClient.on('error', (err) => {
  console.error('❌ Erro na conexão com o Redis:', err);
});

// Função assíncrona para conectar ao Redis
async function connectRedis() {
  if (!redisClient.isOpen) {
    try {
      await redisClient.connect(); // Usando API moderna
      console.log('✅ Redis conectado com sucesso.');
    } catch (err) {
      console.error('❌ Falha ao conectar ao Redis:', err);
    }
  }
}

// Exportação
module.exports = {
  redisClient,
  connectRedis
};

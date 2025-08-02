const redis = require('redis');

// Verifica se as variáveis de ambiente necessárias estão presentes
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

if (!REDIS_HOST || !REDIS_PORT) {
  console.warn('⚠️ Variáveis de ambiente do Redis não estão definidas corretamente.');
}

// Cria o cliente Redis com opções seguras
const redisClient = redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT, 10)
  },
  password: REDIS_PASSWORD || undefined,
  legacyMode: false // Desativa o modo legado por padrão
});

// Tratamento de erros
redisClient.on('error', (err) => {
  console.error('❌ Erro na conexão com o Redis:', err);
});

// Função assíncrona para conectar ao Redis
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

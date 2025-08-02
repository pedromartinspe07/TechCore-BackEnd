require('dotenv').config(); // Carrega variáveis de ambiente
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const redis = require('redis'); // importa o redis

const loginRoutes = require('./api/login');
const noticiasRoutes = require('./api/noticias');
const publicRoutes = require('./api/public');

const app = express();

// Definir a porta (envia primeiro variável de ambiente, senão usa 3000)
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rotas da API (registrar antes do listen)
app.use('/api', loginRoutes);
app.use('/api', noticiasRoutes);
app.use('/api', publicRoutes);

// Rota padrão para testar servidor
app.get('/', (req, res) => {
  res.send('🌐 API TechCore rodando com sucesso!');
  console.log('🌐 API TechCore rodando com sucesso!');
});

// Middleware de erro genérico
app.use((err, req, res, next) => {
  console.error('🔥 Erro interno do servidor:', err);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

// Conectar no MongoDB e Redis e só então iniciar o servidor
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conectado ao MongoDB com sucesso');

    // Criar cliente Redis
    const redisClient = redis.createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
      },
      password: process.env.REDIS_PASSWORD
    });

    // Tratar eventos do Redis
    redisClient.on('error', (err) => {
      console.error('❌ Erro na conexão com Redis:', err);
      process.exit(1);
    });

    await redisClient.connect();
    console.log('✅ Conectado ao Redis com sucesso');

    // Inicia o servidor após conexões bem-sucedidas
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ Falha ao conectar a algum serviço:', err);
    process.exit(1);
  }
}

startServer();

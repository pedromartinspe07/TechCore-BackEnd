require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { redisClient, connectRedis } = require('./utils/redisClient');

const loginRoutes = require('./api/login');
const noticiasRoutes = require('./api/noticias');
const publicRoutes = require('./api/public');

const app = express();
const PORT = process.env.PORT || 3000;

// Tratamento global de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('⚠️ Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
  process.exit(1);
});

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rotas da API
app.use('/api/login', loginRoutes);
app.use('/api/noticias', noticiasRoutes);
app.use('/api/public', publicRoutes);

// Rota base simples
app.get('/', (req, res) => {
  console.log('🌐 API TechCore ativa');
  res.status(200).send('🌐 API TechCore rodando com sucesso!');
});

// Middleware para rotas não encontradas (404)
app.use((req, res) => {
  res.status(404).json({ message: '❌ Rota não encontrada' });
});

// Middleware de erro genérico (500)
app.use((err, req, res, next) => {
  console.error('🔥 Erro interno do servidor:', err);
  res.status(500).json({ message: '❌ Erro interno do servidor' });
});

// Função para inicializar o servidor
async function startServer() {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error('❌ URL do MongoDB (MONGO_URL) não definida no .env');
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Conectado ao MongoDB com sucesso');

    await connectRedis();
    console.log('✅ Conectado ao Redis com sucesso');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Falha ao iniciar o servidor:', err.message);
    process.exit(1);
  }
}

// Inicializa a aplicação
startServer();

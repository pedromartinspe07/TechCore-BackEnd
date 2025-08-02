require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { redisClient, connectRedis } = require('./utils/redisClient');

// Rotas
const loginRoutes = require('./api/login');
const noticiasRoutes = require('./api/noticias');
const publicRoutes = require('./api/public');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rotas da API
app.use('/api', loginRoutes);
app.use('/api', noticiasRoutes);
app.use('/api', publicRoutes);

// Rota base (teste)
app.get('/', (req, res) => {
  console.log('🌐 API TechCore ativa');
  res.status(200).send('🌐 API TechCore rodando com sucesso!');
});

// Middleware para rotas não encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Middleware de erro genérico
app.use((err, req, res, next) => {
  console.error('🔥 Erro interno do servidor:', err);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

// Inicialização do servidor
async function startServer() {
  try {
    // Conexão com o MongoDB
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conectado ao MongoDB com sucesso');

    // Conexão com o Redis
    await connectRedis();
    console.log('✅ Conectado ao Redis com sucesso');

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ Falha ao iniciar o servidor:', err);
    process.exit(1);
  }
}

startServer();

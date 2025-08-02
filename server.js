require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { redisClient, connectRedis } = require('./utils/redisClient');

// Importação das rotas
const loginRoutes = require('./api/login');
const noticiasRoutes = require('./api/noticias');
const publicRoutes = require('./api/public');

// Instância do app
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // arquivos estáticos (HTML, CSS, JS, imagens, etc)

// Prefixo das rotas da API
app.use('/api/login', loginRoutes);
app.use('/api/noticias', noticiasRoutes);
app.use('/api/public', publicRoutes);

// Rota base
app.get('/', (req, res) => {
  console.log('🌐 API TechCore ativa');
  res.status(200).send('🌐 API TechCore rodando com sucesso!');
});

// Middleware para rotas não encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: '❌ Rota não encontrada' });
});

// Middleware de erro genérico
app.use((err, req, res, next) => {
  console.error('🔥 Erro interno do servidor:', err);
  res.status(500).json({ message: '❌ Erro interno do servidor' });
});

// Função principal para iniciar servidor
async function startServer() {
  try {
    // Validação da URL do Mongo
    if (!process.env.MONGO_URL) {
      throw new Error('❌ URL do MongoDB (MONGO_URL) não definida no .env');
    }

    // Conexão MongoDB
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conectado ao MongoDB com sucesso');

    // Conexão Redis
    await connectRedis();
    console.log('✅ Conectado ao Redis com sucesso');

    // Inicialização do servidor
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

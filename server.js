require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const redis = require('redis');

const loginRoutes = require('./api/login');
const noticiasRoutes = require('./api/noticias');
const publicRoutes = require('./api/public');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', loginRoutes);
app.use('/api', noticiasRoutes);
app.use('/api', publicRoutes);

app.get('/', (req, res) => {
  res.send('🌐 API TechCore rodando com sucesso!');
  console.log('🌐 API TechCore rodando com sucesso!');
});

app.use((err, req, res, next) => {
  console.error('🔥 Erro interno do servidor:', err);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conectado ao MongoDB com sucesso');

    const redisClient = redis.createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
      },
      password: process.env.REDIS_PASSWORD
    });

    redisClient.on('error', (err) => {
      console.error('❌ Erro na conexão com Redis:', err);
      process.exit(1);
    });

    await redisClient.connect();
    console.log('✅ Conectado ao Redis com sucesso');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });

  } catch (err) {
    console.error('❌ Falha ao conectar a algum serviço:', err);
    process.exit(1);
  }
}

startServer();

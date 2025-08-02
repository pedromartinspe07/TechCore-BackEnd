// server.js

require('dotenv').config(); // Carrega variáveis de ambiente
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const loginRoutes = require('./api/login');
const noticiasRoutes = require('./api/noticias');
const publicRoutes = require('./api/public');

const app = express();

// Middleware global
app.use(cors());
app.use(express.json()); // Substitui bodyParser.json() para receber dados de formulários
app.use(express.urlencoded({ extended: true })); // Substitui bodyParser.urlencoded() para receber dados de formulários
app.use(express.static('public')); // Serve arquivos estáticos da pasta public

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Conectado ao MongoDB com sucesso'))
  .catch((err) => {
    console.error('❌ Falha ao conectar ao MongoDB');
    console.error(err);
    process.exit(1); // Encerra o servidor se falhar ao conectar
  });

// Rotas da API
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
  console.log('🔥 Erro interno do servidor:', err);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${process.env.PORT}`);
});

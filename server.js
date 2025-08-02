require('dotenv').config(); // Carrega variáveis de ambiente
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const loginRoutes = require('./api/login');
const noticiasRoutes = require('./api/noticias');
const publicRoutes = require('./api/public');

const app = express();

// Definir a porta (envia primeiro variável de ambiente, senão usa 3000)
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(cors());
app.use(express.json()); // Para JSON no body
app.use(express.urlencoded({ extended: true })); // Para dados urlencoded
app.use(express.static('public')); // Para arquivos estáticos

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ Conectado ao MongoDB com sucesso');

    // Só inicia o servidor depois da conexão bem-sucedida
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  })
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
});

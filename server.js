
const mongoose = require('mongoose');
require('dotenv').config(); // se for usar .env local

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB conectado');
}).catch((err) => {
  console.error('Erro ao conectar MongoDB:', err);
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const loginRoutes = require('./api/login');
const noticiasRoutes = require('./api/noticias');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', loginRoutes);
app.use('/api', noticiasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

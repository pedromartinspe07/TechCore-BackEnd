// server.js
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors()); // permite requisições do GitHub Pages
app.use(express.json()); // para ler JSON

const noticias = []; // Banco de dados temporário

app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (email === 'admin@site.com' && senha === '1234') {
    return res.json({ status: 'ok', cargo: 'jornalista' });
  } else {
    return res.status(401).json({ status: 'erro', mensagem: 'Credenciais inválidas' });
  }
});

app.post('/publicar', (req, res) => {
  const { titulo, conteudo } = req.body;
  noticias.push({ titulo, conteudo, data: new Date().toISOString() });
  res.json({ status: 'ok', mensagem: 'Notícia publicada com sucesso!' });
});

app.get('/noticias', (req, res) => {
  res.json(noticias);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

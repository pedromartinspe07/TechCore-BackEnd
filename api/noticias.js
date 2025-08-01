const express = require('express');
const router = express.Router();

// Rota protegida de exemplo
router.get('/noticias', (req, res) => {
  // Aqui você pode validar o token se quiser proteger essa rota
  res.json([
    { titulo: 'Notícia 1', conteudo: 'Conteúdo da notícia 1' },
    { titulo: 'Notícia 2', conteudo: 'Conteúdo da notícia 2' },
  ]);
});

module.exports = router;

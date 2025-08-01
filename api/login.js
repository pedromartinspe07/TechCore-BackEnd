const express = require('express');
const router = express.Router();

// Exemplo de login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Simulação de validação de login (substitua com sua lógica real)
  if (username === 'admin' && password === '1234') {
    res.json({ token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

module.exports = router;

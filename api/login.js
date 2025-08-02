const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Simulando banco de dados de usuários
const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@gmail.com',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'active',
    passwordHash: '$2b$10$3h0dYuCmzpIXnA4Q/EzOYOhYfsnHkaKx8nRPpp3Oa9xCF2aM4F0D2'
  },
  {
    id: 2,
    username: 'editor',
    email: 'editor@gmail.com',
    role: 'editor',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'active',
    passwordHash: '$2b$10$3h0dYuCmzpIXnA4Q/EzOYOhYfsnHkaKx8nRPpp3Oa9xCF2aM4F0D2'
  }
];

const JWT_SECRET = process.env.JWT_SECRET || '04181818';

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
    }

    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
    }

    const senhaCorreta = await bcrypt.compare(password, user.passwordHash);
    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

module.exports = router;

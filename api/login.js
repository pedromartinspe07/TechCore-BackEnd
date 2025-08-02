const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Simulação de banco de dados (poderia ser substituído por MongoDB futuramente)
const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@gmail.com',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'active',
    passwordHash: '$2b$10$3h0dYuCmzpIXnA4Q/EzOYOhYfsnHkaKx8nRPpp3Oa9xCF2aM4F0D2',
    password: "123456"
  },
  {
    id: 2,
    username: 'editor',
    email: 'editor@gmail.com',
    role: 'editor',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'active',
    passwordHash: '$2b$10$3h0dYuCmzpIXnA4Q/EzOYOhYfsnHkaKx8nRPpp3Oa9xCF2aM4F0D2',
    password: "123456"
  }
];

const JWT_SECRET = process.env.JWT_SECRET || '04181818';
const JWT_EXPIRES_IN = '1h';

// Função auxiliar para gerar token
function gerarToken(usuario) {
  return jwt.sign(
    {
      id: usuario.id,
      username: usuario.username,
      role: usuario.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

// Rota de login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validação básica
  if (!username || !password) {
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
  }

  try {
    const usuario = users.find(u => u.username === username);
    if (!usuario) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
    }

    const senhaCorreta = await bcrypt.compare(password, usuario.passwordHash);
    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
    }

    const token = gerarToken(usuario);

    return res.status(200).json({
      token,
      user: {
        id: usuario.id,
        username: usuario.username,
        role: usuario.role
      }
    });

  } catch (erro) {
    console.error('Erro ao tentar fazer login:', erro);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

// Simulação de banco de dados (senhas já estão criptografadas)
const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@gmail.com',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'active',
    // Senha: 123456
    passwordHash: '$2b$10$s7JkczTQ7k95NCcx49G.LuXYkXtVh8.A4SWW8yP9IEXURuHv1Zn8K'
  },
  {
    id: 2,
    username: 'editor',
    email: 'editor@gmail.com',
    role: 'editor',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'active',
    // Senha: 123456
    passwordHash: '$2b$10$s7JkczTQ7k95NCcx49G.LuXYkXtVh8.A4SWW8yP9IEXURuHv1Zn8K'
  }
];

const JWT_SECRET = process.env.JWT_SECRET || '04181818';
const JWT_EXPIRES_IN = '1h';

// Função auxiliar para gerar o token
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

// Rota POST /login com validação e autenticação
router.post(
  '/login',
  [
    body('username').trim().isString().notEmpty().withMessage('Usuário é obrigatório.'),
    body('password').trim().isString().notEmpty().withMessage('Senha é obrigatória.')
  ],
  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ message: 'Dados inválidos.', errors: erros.array() });
    }

    const { username, password } = req.body;

    try {
      // Comparar username ignorando maiúsculas/minúsculas (opcional)
      const usuario = users.find(
        (u) => u.username.toLowerCase() === username.toLowerCase()
      );

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
      console.error('Erro no login:', erro);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }
);

module.exports = router;

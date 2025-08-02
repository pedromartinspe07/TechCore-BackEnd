const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Simulando um banco de dados de usuários
const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@gmail.com',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'active',
    password: '051819pE@', //senha do usuário
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
    password: '051819pE@', //senha do usuário
    passwordHash: '$2b$10$3h0dYuCmzpIXnA4Q/EzOYOhYfsnHkaKx8nRPpp3Oa9xCF2aM4F0D2' 
  }
];

// Segredo do JWT (deve vir do .env em produção)
const JWT_SECRET = process.env.JWT_SECRET || '04181818'; //segredo do JWT

router.post('/login', async (req, res) => { //rota para fazer login
  const { username, password } = req.body; //pega o username e password do body

  // Verifica se o usuário existe
  const user = users.find(u => u.username === username); //busca o usuário no banco de dados
  if (!user) { //se o usuário não for encontrado, retorna erro 401
    return res.status(401).json({ message: 'Usuário ou senha inválidos.' }); //retorna mensagem de erro
  }

  // Verifica se a senha está correta
  const senhaCorreta = await bcrypt.compare(password, user.passwordHash); //compara a senha com a senha criptografada
  if (!senhaCorreta) { //se a senha não for correta, retorna erro 401
    return res.status(401).json({ message: 'Usuário ou senha inválidos.' }); //retorna mensagem de erro
  }

  // Cria token JWT
  const token = jwt.sign( //cria o token JWT
    { id: user.id, username: user.username }, //dados do usuário
    JWT_SECRET, //segredo do JWT
    { expiresIn: '1h' } // Token expira em 1 hora
  );

  res.json({ token }); //retorna o token em formato JSON
});

module.exports = router;

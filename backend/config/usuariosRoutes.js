require('dotenv').config()
// console.log(process.env)

const express = require("express");
let db_usuarios = require("../src/data/usuarios.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const routes = express.Router();
const fs = require("fs");

let userDB = db_usuarios;

const SECRET_KEY = process.env.API_KEY_LOCAL

routes.get('/usuarios', (req, res)=>{
  return res.json(userDB);
})

// Middleware para verificar o token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if(!token) {
    return res.status(403).json({erro: 'Token não fornecido'})
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({erro: 'Token inválido'})
    }

    req.userId =decoded.id; // Armazena o id od usuario decodificado para uso posterios
    next();
    
  })
}

routes.post('/register', async (req, res) =>{
  const { username, email, password } = req.body;

  // Verifica se todos os campos estão presentes
  if (!username || !email || !password) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }
  // Verifica se o usuário já existe
  const userExists = userDB.find(user => user.email === email);
  if (userExists) {
      return res.status(400).json({ erro: "Usuário já existe." });
  }

  // Hasheia a senha antes de armazenar
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: userDB.length+1,
    nome: username,
    email: email,
    senha: hashedPassword,
    siulacoes: []
  }
  // Armazena o novo usuário
  userDB.push(newUser)
  // return res.status(201).json({ message: "Usuário registrado com sucesso!" });
  // Gera um token JWT
  const token = jwt.sign({id: newUser.id}, SECRET_KEY, {expiresIn: '1h'})
  return res.status(200).json({ token })
  
})

routes.post("/login", async (req, res)=>{
  const { email, password } = req.body;

  // Verifica se os campos estão presentes
  if (!email || !password) {
      return res.status(400).json({ erro: "Email ou senha não fornecidos." });
  }

  // Busca o usuário no banco de dados
  const user = userDB.find(user => user.email === email);
  
  if (!user) {
      return res.status(401).json({ erro: "Email ou senha inválidos." });
  }

  // Verifica a senha
  const isPasswordValid = await bcrypt.compare(password, user.senha);
 
  if (!isPasswordValid) {
      return res.status(401).json({ erro: "Email ou senha inválidos." });
  }

  // Gera um token JWT
  const token = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: '1h'})
  return res.status(200).json({ token })
})

// Endpoint para adicionar ou alterar as simulações do usuário
routes.put("/alterar-simulacoes", verifyToken, (req, res) => {
  const usuarioId = req.userId;
  const { simulacoes } = req.body; // Espera que 'simulacoes' seja o novo array ou um item a ser adicionado
  

  // Verifica se o campo 'simulacoes' foi fornecido
  if (!simulacoes) {
    return res.status(400).json({ erro: "Simulação não fornecida." });
  }

  // Busca o usuário na base de dados usando o ID
  const usuario = userDB.find(user => user.id === usuarioId);

  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado." });
  }

  // Verifica se a propriedade 'simulacoes' existe, caso contrário, cria um array vazio
  if (!usuario.simulacoes) {
    usuario.simulacoes = [];
  }

  // Se a 'simulacoes' for um array, substitui o campo inteiro
  if (Array.isArray(simulacoes)) {
    usuario.simulacoes = simulacoes;
  } else {
    // Caso contrário, adiciona a nova simulação ao array existente
    usuario.simulacoes.push(simulacoes);
  }

  // Simula a persistência no arquivo, já que você está usando um arquivo JSON
  fs.writeFileSync("./src/data/usuarios.json", JSON.stringify(userDB, null, 2));

  // Retorna a resposta de sucesso
  return res.status(200).json({ mensagem: "Simulação(s) atualizada(s) com sucesso." });
});



// Endpoint protegido

routes.get("/protegido", verifyToken, (req, res) =>{

  // Acessa o ID do usuario do token decodificado do verifyToken
  const usuarioId = req.userId;

  // Busca o usuário na base de dados usando o ID
  const usuario = userDB.find(user => user.id ===  usuarioId);

  if(!usuario){
    return res.status(404).json({erro: "Usuario não encontrado"})
  }

  // Retorna os dados do usuário excluindo a senha por segurança
  const {senha, id, ...dadosUsuario} = usuario;

  
  res.status(200).json({
    mensagem: 'Acesso autorizado', 
    usuario: dadosUsuario
  });
});
  
module.exports = routes;
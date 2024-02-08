// Express Framework
const cors = require('cors'); // Importe o módulo cors
const express = require('express');
const app = express();

// Import.Controllers
const ItemController = require('./controllers/ItemController.js');
const itemController = new ItemController(); // usando um nome de variável diferente

// Define Json
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
  }));
  
// Routes (Rotas)
app.get('/', function(req, res) {
    res.send('Bem vindo => ');
});

// item
app.get('/tarefa', (req, res) => itemController.findAll(req, res));
app.post('/tarefa', (req, res) => itemController.create(req, res));
app.get('/tarefa/:id', (req, res) => itemController.findById(req, res));
app.put('/tarefa/:id', (req, res) => itemController.update(req, res));
app.delete('/tarefa/:id', (req, res) => itemController.delete(req, res));

// Start server
app.listen(3000, function() {
    console.log('Servidor rodando na porta 3000');
});

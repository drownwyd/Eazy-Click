const express = require('express');
const path = require('path');
const cors = require('cors'); // Importa o cors

const app = express();
const port = process.env.PORT || 3000;

// Usa o middleware cors
app.use(cors());

// Serve arquivos estáticos da pasta atual
app.use(express.static(path.join(__dirname)));

// Rota principal para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
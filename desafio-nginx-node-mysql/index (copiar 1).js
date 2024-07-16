const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL');

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `;

  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Erro ao criar a tabela:', err);
      return;
    }
    console.log('Tabela criada ou já existente');
  });
});

app.get('/', (req, res) => {
  db.query('SELECT name FROM people', (err, result) => {
    if (err) {
      console.error('Erro ao buscar nomes:', err);
      res.status(500).send('Erro ao buscar nomes');
      return;
    }
    const names = result.map((item) => item.name).join(', ');
    res.send(`<h1>Full Cycle Rocks!</h1><p>Lista de nomes cadastrados: ${names}</p>`);
  });
});

app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`);
});


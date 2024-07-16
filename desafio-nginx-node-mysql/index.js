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
    const names = result.map((item) => `<tr><td><b>${item.name}</b></td></tr>`).join('');
    const htmlResponse = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lista de Nomes</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #222;
            color: #fff;
            padding: 20px;
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100vh;
          }
          h1 {
            color: #ffd700;
            text-align: center;
            font-size: 2rem;
            position: sticky;
            top: 0;
            background-color: #333;
            width: 100%;
            padding: 10px 0;
            margin-bottom: 20px;
            z-index: 1;
            transition: background-color 0.3s;
          }
          h1:hover {
            background-color: #444;
          }
          .container {
            width: 80%;
            max-width: 800px; /* Largura máxima da tabela */
            background-color: #333;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
            overflow: auto;
            max-height: 80vh; /* Altura máxima da tabela */
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 1.4rem; /* Aumenta o tamanho da fonte da tabela */
            text-align: center; /* Centraliza o conteúdo da tabela */
          }
          th, td {
            padding: 15px;
            border-bottom: 1px solid #444;
          }
          th {
            background-color: #555;
            color: #ffd700;
            font-weight: bold; /* Fonte em negrito para cabeçalho */
          }
          tbody tr:nth-child(even) {
            background-color: #444;
          }
          tbody tr:hover {
            background-color: #666;
          }
        </style>
      </head>
      <body>
        <h1>Full Cycle Rocks!</h1>
        <div class="container">
              
         <table>
            <thead>
              <tr>
                <th>Nomes</th>
              </tr>
            </thead>
            <tbody>
              ${names}
            </tbody>
          </table>
        </div>
      </body>
      </html>
    `;
    res.send(htmlResponse);
  });
});

app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`);
});


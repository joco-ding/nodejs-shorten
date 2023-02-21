const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const routes = require('./routes');

// Set up the database connection
const pool = mysql.createPool({
  host: 'localhost',
  port: 9706,
  user: 'shorten',
  password: '5h0rt3n',
  database: 'db_shorten',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Set up the API routes
app.use('/', routes(pool));

// Start the server
const port = 3009;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

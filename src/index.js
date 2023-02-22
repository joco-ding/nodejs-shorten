// memuat pustaka Express.js yang digunakan untuk membuat aplikasi web dan menangani permintaan HTTP.
const express = require('express');
// membuat instance aplikasi Express.
const app = express();
// memuat pustaka body-parser yang digunakan untuk mem-parsing request body dari permintaan HTTP yang masuk.
const bodyParser = require('body-parser');
// memuat pustaka mysql2/promise yang digunakan untuk membuat koneksi ke database MySQL.
const mysql = require('mysql2/promise');
// memuat modul route yang berisi definisi dari routing endpoint API.
const routes = require('./routes');

// membuat koneksi pool ke database MySQL dengan parameter host, port, user, password, database, dan beberapa opsi lainnya.
const pool = mysql.createPool({
  host: 'localhost',
  port: 9706,
  user: 'shorten',
  password: '5h0rt3n',
  database: 'db_shorten',
  // Menentukan apakah koneksi harus menunggu jika semua koneksi dalam pool telah digunakan.
  waitForConnections: true,
  // Menentukan jumlah maksimum koneksi yang dapat ditampung oleh pool.
  connectionLimit: 10,
  // Menentukan jumlah maksimum antrian koneksi yang dapat ditampung oleh pool.
  queueLimit: 0
});

// menambahkan middleware body-parser ke aplikasi Express untuk mem-parsing JSON dari request body.
app.use(bodyParser.json());

// menambahkan middleware routing endpoint API yang di-definisikan di dalam modul route.
app.use('/', routes(pool));

// mendefinisikan nomor port yang akan digunakan oleh server.
const port = 3009;
// memulai server dengan menggunakan nomor port yang telah didefinisikan, dan mencetak pesan pada console ketika server sudah siap melayani permintaan.
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
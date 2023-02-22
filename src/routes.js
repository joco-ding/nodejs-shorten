// memuat pustaka Express.js yang digunakan untuk membuat router.
const express = require('express');
// membuat instance router menggunakan fungsi express.Router().
const router = express.Router();
// memuat pustaka path yang digunakan untuk mengakses path dari file public.
const path = require('path');
// memuat objek createShortUrl, getLongUrl, dan redirectToLongUrl dari modul handlers.
const { createShortUrl, getLongUrl, redirectToLongUrl } = require('./handlers');

// mengekspor sebuah function yang menerima satu argumen pool.
module.exports = (pool) => {
// menambahkan middleware untuk menyajikan file statis dari direktori public.
  router.use(express.static(path.join(__dirname, 'public')));

// menambahkan endpoint API POST /api/shorten yang akan diproses oleh fungsi createShortUrl dengan mem-passing objek pool.
  router.post('/api/shorten', createShortUrl(pool));

// menambahkan endpoint API GET /:shortId yang akan diproses oleh fungsi redirectToLongUrl dengan mem-passing objek pool.
  router.get('/:shortId', redirectToLongUrl(pool));

// mengembalikan instance router yang telah di-konfigurasi dan diisi dengan endpoint API.
  return router;
};


// memuat pustaka shortid yang digunakan untuk membuat ID pendek secara acak.
const shortid = require('shortid');

// mengekspor sebuah fungsi createShortUrl yang menerima satu argumen pool. Fungsi ini akan memproses permintaan HTTP dengan method POST /api/shorten dan memasukkan data URL pendek dan URL asli ke dalam database MySQL.
exports.createShortUrl = (pool) => async (req, res) => {
  // mendeklarasikan variabel longUrl dengan nilai dari atribut longUrl pada objek req.body.
  const { longUrl } = req.body;
  // mendeklarasikan variabel shortId dengan nilai ID pendek yang di-generate oleh pustaka shortid.
  const shortId = shortid.generate();

  try {
    // membuat koneksi ke database MySQL dengan menggunakan objek pool.
    const conn = await pool.getConnection();
    // mengeksekusi query SQL untuk memasukkan data URL pendek dan URL asli ke dalam tabel urls pada database MySQL.
    await conn.query('INSERT INTO urls SET ?', {
      long_url: longUrl,
      short_id: shortId,
      created_at: new Date()
    });
    // melepaskan koneksi ke database MySQL agar dapat digunakan kembali.
    conn.release();
    // mengembalikan respons JSON yang berisi URL pendek yang baru dibuat.
    res.json({ shortUrl: `http://localhost:3009/${shortId}` });
  } catch (err) {
    // menampilkan error pada console dan mengembalikan respons JSON yang berisi pesan error ketika terjadi kesalahan dalam memproses permintaan HTTP.
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// mengekspor sebuah fungsi redirectToLongUrl yang menerima satu argumen pool. Fungsi ini akan memproses permintaan HTTP dengan method GET /:shortId dan mengembalikan URL asli yang terkait dengan ID pendek tersebut.
exports.redirectToLongUrl = (pool) => async (req, res) => {
  // mendeklarasikan variabel shortId dengan nilai dari parameter shortId pada objek req.
  const {
    shortId } = req.params;

  try {
    const conn = await pool.getConnection();
    // mengeksekusi query SQL untuk mencari data URL asli yang terkait dengan ID pendek yang diberikan pada tabel urls.
    const [rows] = await conn.query('SELECT * FROM urls WHERE short_id = ?', [shortId]);
    // melepaskan koneksi ke database MySQL agar dapat digunakan kembali.
    conn.release();
    // melakukan pengecekan apakah data URL asli ditemukan atau tidak.
    if (rows.length > 0) {
      // mendeklarasikan variabel longUrl dengan nilai URL asli dari baris pertama hasil query SQL.
      const longUrl = rows[0].long_url;
      // mengeksekusi query SQL untuk menambahkan jumlah klik pada data URL pendek yang telah digunakan.
      await conn.query('UPDATE urls SET clicks = clicks + 1 WHERE short_id = ?', [shortId]);
      // mengarahkan pengguna ke URL asli yang terkait dengan ID pendek yang diberikan.
      res.redirect(longUrl);
    } else {
      // mengembalikan respons JSON yang berisi pesan error tidak ditemukan.
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (err) {
    // menampilkan error pada console dan mengembalikan respons JSON yang berisi pesan error ketika terjadi kesalahan dalam memproses permintaan HTTP.
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



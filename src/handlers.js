const shortid = require('shortid');

// Handle URL shortening requests
exports.createShortUrl = (pool) => async (req, res) => {
  const { longUrl } = req.body;
  const shortId = shortid.generate();

  try {
    const conn = await pool.getConnection();
    await conn.query('INSERT INTO urls SET ?', {
      long_url: longUrl,
      short_id: shortId,
      created_at: new Date()
    });
    conn.release();
    res.json({ shortUrl: `http://localhost:3009/${shortId}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Handle URL retrieval requests
exports.getLongUrl = (pool) => async (req, res) => {
  const { shortId } = req.params;

  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM urls WHERE short_id = ?', [shortId]);
    conn.release();
    if (rows.length > 0) {
      res.json({ longUrl: rows[0].long_url });
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Handle URL redirection requests
exports.redirectToLongUrl = (pool) => async (req, res) => {
  const {
    shortId } = req.params;

  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM urls WHERE short_id = ?', [shortId]);
    conn.release();
    if (rows.length > 0) {
      const longUrl = rows[0].long_url;
      await conn.query('UPDATE urls SET clicks = clicks + 1 WHERE short_id = ?', [shortId]);
      res.redirect(longUrl);
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


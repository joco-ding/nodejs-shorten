const express = require('express');
const router = express.Router();
const path = require('path');
const { createShortUrl, getLongUrl, redirectToLongUrl } = require('./handlers');

module.exports = (pool) => {
  // Serve the static assets
  router.use(express.static(path.join(__dirname, 'public')));

  // Handle URL shortening requests
  router.post('/api/shorten', createShortUrl(pool));

  // Handle URL retrieval requests
  router.get('/api/urls/:shortId', getLongUrl(pool));

  // Handle URL redirection requests
  router.get('/:shortId', redirectToLongUrl(pool));

  return router;
};

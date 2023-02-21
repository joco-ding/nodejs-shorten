const shortenForm = document.querySelector('#shorten-form');
const urlInput = document.querySelector('#url-input');
const shortUrlContainer = document.querySelector('#short-url-container');

shortenForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const longUrl = urlInput.value.trim();
  if (!longUrl) {
    return;
  }
  const response = await fetch('/api/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ longUrl })
  });
  if (response.ok) {
    const data = await response.json();
    const shortUrl = data.shortUrl;
    shortUrlContainer.innerHTML = `
      <p>Short URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a></p>
    `;
    urlInput.value = '';
  } else {
    alert('An error occurred. Please try again later.');
  }
});

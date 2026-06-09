const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const ROOT = __dirname;

const mimeTypes = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'text/javascript',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0]; // strip query string
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(ROOT, urlPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h2>404 - Page not found</h2><p><a href="/">Go Home</a></p>');
      } else {
        res.writeHead(500);
        res.end('Server error');
      }
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n  Shell Station running at: http://localhost:${PORT}\n`);
  console.log('  Pages:');
  console.log(`    Home      -> http://localhost:${PORT}/`);
  console.log(`    Fuel      -> http://localhost:${PORT}/fuel.html`);
  console.log(`    Food      -> http://localhost:${PORT}/food.html`);
  console.log(`    Products  -> http://localhost:${PORT}/products.html`);
  console.log(`    Services  -> http://localhost:${PORT}/services.html`);
  console.log(`    Contact   -> http://localhost:${PORT}/contact.html`);
  console.log(`    About     -> http://localhost:${PORT}/about.html`);
  console.log('\n  Press Ctrl+C to stop the server.\n');
});

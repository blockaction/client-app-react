const express = require('express');
const next = require('next');
const routes = require('./routes');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const handler = routes.getRequestHandler(app);
app.prepare().then(() => {
  const server = express();
  server.use(express.static(path.join(__dirname, '../static')));
  server.use(handler);
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3005, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3005');
  });
});

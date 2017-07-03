const fs = require('fs');

const express = require('express');
const request = require('request');


const app = express();

app.set('port', process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.get('/random-photo', (req, res) => {
  const dimensions = `${req.query.size}x${req.query.size}`
  const url = `https://source.unsplash.com/random/${dimensions}`;

  request(url).pipe(res);
});

app.listen(app.get('port'), () => {
  console.info(`Listening: http://localhost:${app.get('port')}/`);
});

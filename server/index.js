const fs = require('fs');

const nconf = require('nconf');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

require('./initialize');

const app = express();

app.set('port', nconf.get('PORT') || 3004);

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

const BUCKET_NAME = 'alula-ca';

// ugh, I hate AWS. Why couldn't they have just let me pass a config object.
const AWS_CONFIG_PATH = process.env.NODE_ENV === 'production'
  ? '/home/deploy/config/alula/aws.json'
  : './server/config/aws.json';
AWS.config.loadFromPath(AWS_CONFIG_PATH);

const s3 = new AWS.S3();
const s3Bucket = new AWS.S3({params: {Bucket: BUCKET_NAME}});


// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.get('/random-photo', (req, res) => {
  const dimensions = `${req.query.size}x${req.query.size}`
  const url = `https://source.unsplash.com/random/${dimensions}`;

  request(url).pipe(res);
});

app.post('/save', (req, res) => {
  const {file} = req.body;

  base64Data = file.replace(/^data:image\/png;base64,/,""),
  binaryData = new Buffer(base64Data, 'base64');

  const timestamp = (new Date()).getTime();
  var data = {Key: `image-${timestamp}.png`, Body: binaryData};

  s3Bucket.putObject(data, function(err, data){
    if (err) {
      console.error('Error uploading data: ', err, data);
      res.json({ ok: false });

    } else {
      console.log('succesfully uploaded the image!');
      res.json({ ok: true });
    }
  });
});

// Redirect /create to the homepage, in case people refresh while
// working on something.
app.get('/create', (req, res) => {
  res.redirect('/');
});

app.listen(app.get('port'), () => {
  console.info(`==> 🌎  Listening on port ${app.get('port')}.`);
});

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const db = 'mongodb://sudheendra:sudheendra1@ds145871.mlab.com:45871/db_one';
mongoose.connect(db, {useNewUrlParser: true});

//On connection
mongoose.connection.on('connected', function() {
  console.log('connected to mlab');
});
//On error
mongoose.connection.on('error', function() {
  consolelog('connection error');
});

const app = express();
const port = 3000;
const routes = require('./routes');

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

app.get('/', function(req, res) {
  res.send('invalid');
});

app.listen(port, function() {
  console.log('Server started on port '+port);
});
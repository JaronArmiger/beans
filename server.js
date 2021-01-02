const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { readdirSync } = require('fs');
require('dotenv').config();
var path = require('path');

// app
const app = express();
// db
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).then(() => console.log('DB CONNECTED'))
  .catch(err => console.log(`DB CONNECTION ERR: ${err}`))

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

// routes
readdirSync('./routes').map((r) => {
  return app.use('/api', require(`./routes/${r}`));
});

app.get('/.well-known/acme-challenge/GAR0HJU4WcyXhX1fEEo8oYh28wzH-rr4a7t-ojqKfRg', (req, res) => {
  res.sendFile(path.join(__dirname, './GAR0HJU4WcyXhX1fEEo8oYh28wzH-rr4a7t-ojqKfRg'));
});

const pathway = path.join(__dirname, 'client', 'build');
app.use(express.static(pathway));
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: pathway });
  // res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
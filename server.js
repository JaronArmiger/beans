const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { readdirSync } = require('fs');
require('dotenv').config();
var path = require('path');

// app
const app = express();
// db
require('./mongoConfig');

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({
  extended: true,
}))
app.use(cors());

// routes
readdirSync('./routes').map((r) => {
  return app.use('/api', require(`./routes/${r}`));
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
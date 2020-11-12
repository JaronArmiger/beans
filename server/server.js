const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// app
const app = express();
console.log(process.env.PORT)
// db
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
}).then(() => console.log('DB CONNECTED'))
  .catch(err => console.log(`DB CONNECTION ERR: ${err}`))

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

// route
app.get('/api', (req, res) => {
  res.json({
  	data: 'fuck you',
  });
});

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
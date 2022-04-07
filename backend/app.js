const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error');
const userRoutes = require('./routes/users');
require('dotenv').config();

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    app.listen(process.env.PORT);
    console.log(`Server started on port ${process.env.PORT}.`);
  } catch (error) {
    console.log(error);
  }
};

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
);

app.use('/user', userRoutes);

app.use((req, res, next) => {
  throw new HttpError('Route Not Found.', 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || 'An error occurred.' });
});

startServer();

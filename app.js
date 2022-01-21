// _______________________________________ modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const userRouter = require('./routes/user');

// ___________________________________.env file for jwt key
require('dotenv').config();

// _______________________application
const app = express();

const { PORT = 3000 } = process.env;

// ________________________________limiter function to prevent too many server requests
app.set('trust proxy', 1); // for proxy service Heroku

// _____________________________________app setup
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(cors());
app.options('*', cors());

app.use(userRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(`App is listening at port ${PORT}`);
})
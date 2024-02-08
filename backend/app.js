require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const errorMiddleware = require('./middlewares/errorMiddleware');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsRequest = require('./middlewares/corsRequest');
const { PORT, BD_URL } = require('./utils/config');

const app = express();

mongoose.connect(BD_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(corsRequest);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use(errorMiddleware);

app.listen(PORT);

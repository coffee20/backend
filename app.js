// Dependencies settings
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const logger = require('morgan');
const db = require('./src/db');
dotenv.config();


const app = express()
const port = process.env.PORT || 3000;

// body-parser setting (http 요청 데이터 파싱 미들웨어)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger('dev'));

// routing
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/user', require('./routes/userRouter'));
app.use('/api/cafe', require('./routes/cafeRouter'));

// Server connection
app.listen(port, () => console.log(`Server listening on port ${port}`));
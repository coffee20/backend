const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
dotenv.config();

const app = express()
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB Connected!"))
    .catch(e => console.error(e));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api', require('./routes/router'));

app.listen(port, () => console.log(`Server listening on port ${port}`));
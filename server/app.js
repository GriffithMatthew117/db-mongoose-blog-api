const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

mongoose.connect('mongodb://Masttehen:MC1ef11!@ds125479.mlab.com:25479/blogapi');
mongoose.Promise = Promise;

const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.status(200).send();
    res.send('I am the man')
})

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

module.exports = app;
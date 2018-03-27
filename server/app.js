const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const morgan = require('morgan')



var uri = process.env.MONGODB_URI || 'mongodb://localhost/my-blog';

mongoose.connect(uri);



mongoose.Promise = Promise;



//Get the default connection

var db = mongoose.connection;



//Bind connection to error event (to get notification of connection errors)

db.on('error', console.error.bind(console, 'MongoDB connection error:'));



const app = express();



app.use(bodyParser.json());

app.use(morgan("dev"));







app.get("/", (req, res) => {

    res.status(200).send("Only /api/blogs or api/users work right now");

});



app.use("/api/users", require("./routes/users"));

app.use("/api/blogs", require("./routes/blogs"));







module.exports = app;












// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');


// // let url = 'mongodb://Masttehen:MC1ef11!@ds125479.mlab.com:25479/blogapi'
// let url = 'mongodb://heroku_f9lh48hb:9jppsllql8buha75qbevt7tago@ds125489.mlab.com:25489/heroku_f9lh48hb';
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/my-blog");
// mongoose.Promise = Promise;

// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB Connection Error"));

// const app = express();
// app.use(bodyParser.json());
// app.use(morgan("dev"));

// app.get('/', (req, res) => {
//     res.status(200).send("go to /api/blogs or api/users");
//     // res.send('I am the man')
// })

// app.use('/api/users', require('./routes/users'));
// app.use('/api/blogs', require('./routes/blogs'));

// module.exports = app;
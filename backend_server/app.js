const mongoose = require("mongoose");

const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
// const Alien = require('./models/alien.js')

// const fs = require("fs");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

console.log("Getting started");
url = "mongodb://localhost:27017/bookstamp";
// make a connection
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// get reference to database
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Connection Successful!");
});

// var UserController = require('./user/UserController');
// app.use('/users', UserController);

var AuthController = require("./auth/AuthController");
app.use("/api/auth", AuthController);

// var AuthController1 = require('./auth/alien');
// app.use('/api/auth', AuthController1);

const alienRouter = require("./routes/alien");
app.use("/alien", alienRouter);

const magazineRouter = require("./routes/magazine");
app.use("/magazine", magazineRouter);

const todoRouter = require("./todo/TodoController");
app.use("/todo", todoRouter);

var server = app.listen(4000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});

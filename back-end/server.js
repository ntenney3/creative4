const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// setup express
const app = express();

// setup body parser middleware to conver to JSON and handle URL encoded forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// connect to the mongodb database
mongoose.connect('mongodb://localhost:27017/websitedata', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const users = require("./users.js");
app.use("/api/users", users.routes);

const websites = require("./websites.js");
app.use("/api/websites", websites.routes);

app.listen(3002, () => console.log('Server listening on port 3002!'));

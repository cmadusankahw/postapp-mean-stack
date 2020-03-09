const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routeredPosts = require('./routes/posts');

const app = express();

mongoose.connect('mongodb+srv://chiran:tevo1NqT1TupRAFo@cluster0-sylop.mongodb.net/postapp?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to monogodb database..');
  })
  .catch(() => {
    console.log('Connection to database failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Allow CROS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/posts",routeredPosts);

module.exports = app;

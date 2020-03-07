const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./model/post');

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
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

//POST data (posts)
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save().then(result => {
    res.status(201).json({
      message: 'Post added successfully!',
      postId: result.id
    });
  });

});

//get posts
app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    //it's important to put this inside as this is asynchronous (data must get from db first before fetching)
    res.status(200).json({
      message: "Posts fetchd Successfully!",
      posts: documents
    });
  });

});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ id: req.param.id }).then(result => {
    console.log(result);

    res.status(200).json({
      message: 'Post deleted successfully!'
    });
  })

});

module.exports = app;

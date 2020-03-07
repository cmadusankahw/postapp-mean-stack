const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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
app.post("/api/posts",(req, res, next) => {
  const post= req.body;
  //to check
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully!'
  });
});

//get posts
app.get("/api/posts", (req, res, next) => {
  const posts = [{
    id: "23fefef",
    title: "First Server Post",
    content: "Smaple Content"
  },
  {
    id: "343fgdf",
    title: "Second Server Post",
    content: "Smaple Content"
  }
  ];
  res.status(200).json({
    message: "Posts fetchd Successfully!",
    posts: posts
  });
});

module.exports = app;

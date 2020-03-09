const express = require('express');

const Post = require("../model/post");

const router = express.Router();

//POST data (posts)
router.post("", (req, res, next) => {
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

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: ' Post not found!' });
    }
  });
});


router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Updated successfully!'
    });
  });
});


//get posts
router.get("", (req, res, next) => {
  Post.find().then(documents => {
    //it's important to put this inside as this is asynchronous (data must get from db first before fetching)
    res.status(200).json({
      message: "Posts fetchd Successfully!",
      posts: documents
    });
  });

});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ id: req.param.id }).then(result => {
    console.log(result);

    res.status(200).json({
      message: 'Post deleted successfully!'
    });
  })

});

module.exports = router;

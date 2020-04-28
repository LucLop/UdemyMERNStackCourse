const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");


router.get('/allpost', (req, res) => {
    Post.find() //Get all the post
    .populate('postedBy', "_id name")
    .then(posts=> {
        res.json({posts});
    })
    .catch(err =>{
        console.log(err);
    })
})

router.post('/createpost', requireLogin, (req, res) => {
    const {title, body} = req.body;
    if(!title || !body){
       return res.status(422).json({error: "Please add all required fields"});
    }

    req.user.password = undefined; //With this line the password doesnt appear in the field postedBy
    const post = new Post ({
        title,
        body,
        postedBy: req.user
    })
    post.save().then(result =>{
        res.json({post: result})
    })
    .catch(err => {
        console.log(err);
    })
})


router.get('/mypost', requireLogin, (req, res) => {
    Post.find({postedBy: req.user._id})
    .populate("PostedBy", "_id name")
    .then(mypost => {
        res.json({mypost});
    })
    .catch(err => {
        console.log(err);
    })
})

module.exports = router;
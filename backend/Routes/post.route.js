const { RouterOutlet } = require('@angular/router');
const express = require('express');

const app = express;

const router = express.Router();

const postModel = require('../Model/Post');


router.post('', (req, res, next) => {
    const post = new PostModel({
        title: req.body.title,
        content: req.body.content
    })
    post.save().then(post => {
        res.status(200).json({
            message: 'Post added successfully!!',
            postId:post.id
        })
    }).catch(err => {
        res.status(400).send('Something went wrong!')
    });

})


// update post

router.put('/:id', (req, res, next) => {
    const post = new PostModel({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    })
    PostModel.updateOne({_id:req.params.id}, post).then(post => {
        res.status(200).json({
            message: 'Post updated successfully!!',
        })
    }).catch(err => {
        res.status(400).send('Something went wrong!')
    });
})

// get posts

router.get('', async (req, res, next) => {
    const post = await PostModel.find();
    res.status(200).json({
        message: 'fetched posts successfully',
        posts: post
    })
})


// get post by id

router.get('/:id', (req, res, next) => {
    PostModel.findById(req.params.id).then((err, post) => {
        if(post){
            res.status(200).json(post)
        } else {
            res.status(400).json('Post not found')
        }
    })
});

// delete post

router.delete('/:id', (req, res, next) => {
    PostModel.findByIdAndRemove({
        _id: req.params.id
    }).then((err, post) => {
        if (err) {
            res.json(err);
            console.log(err)
        } else {
            res.json("Successfully Removed");
        }
    })
})

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const PostModel = require('./Model/Post');
const { async } = require('rxjs');

mongoose.connect("mongodb+srv://admin-manjunath:manju123@cluster0.56noa.mongodb.net/Posts?retryWrites=true&w=majority", { useNewUrlParser: true }).then(() => {
    console.log('Connected to Database');
}, (err) => {
    console.log('There is problem connecting to database');
})



app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Add posts

app.post('/api/posts', (req, res, next) => {
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

app.put('/api/posts/:id', (req, res, next) => {
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

app.get('/api/posts', async (req, res, next) => {
    const post = await PostModel.find();
    res.status(200).json({
        message: 'fetched posts successfully',
        posts: post
    })
})


// get post by id

app.get('/api/posts/:id', (req, res, next) => {
    const id = req.params.id
    PostModel.findById(id).then((err, post) => {
        if(post){
            res.status(200).json({post})
        } else {
            res.status(400).json('Post not found')
        }
    })
});

// delete post

app.delete('/api/posts/:id', (req, res, next) => {
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

module.exports = app;
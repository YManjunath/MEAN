const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const PostModel = require('./Model/Post');
const { async } = require('rxjs');

mongoose.connect("mongodb+srv://admin-manjunath:manju123@cluster0.56noa.mongodb.net/Posts?retryWrites=true&w=majority", { useNewUrlParser: true }).then(() => {
    console.log('Database is connected');
}, (err) => {
    console.log('There is problem connecting to database');
})



app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
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
            message: 'Post added successfully!!'
        })
    }).catch(err => {
        res.status(400).send('Something went wrong!')
    });
    console.log(post);

})

// get posts

app.get('/api/posts', async (req, res, next) => {
    const post = await PostModel.find();
    res.status(200).json({
        message: 'fetched posts successfully',
        posts: post
    })
})

module.exports = app;
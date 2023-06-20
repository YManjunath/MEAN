const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    next();
});

// Add posts

app.post('/api/posts', (req, res, next)=>{
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message:'Post added successfully!!'
    })
})

app.use('/api/posts', (req, res, next) => {
    const posts = [
        { id: 'facv123', title: 'First server post', content: 'new content from server' },
        { id: 'fafg456', title: 'Second server post', content: 'new content from server!!' },
    ]
    res.status(200).json({
        message: 'fetched posts successfully',
        posts: posts
    })
})

module.exports = app;
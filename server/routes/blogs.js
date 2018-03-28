const express = require('express');
const router = express.Router();
const blog = require('../models/blog');
const User = require('../models/User');

router.get('/', (req, res) => {
    blog.find()
        .then(blogs => {
            res.status(200).json(blogs);
        });

});

router.get('/featured', (req, res) => {
    blog.where('featured', 'true')
        .then(blog => {
            res.status(200).json(blog);
        })
        .catch(err => {
            console.log("Err", err);
            res.status(404).send(null);
        });
});

router.post('/', (req, res) => {
    console.log('HIT THE ROUTE==========DROP THE BASS')
    User
        .findById(req.body.authorId)
        .then(user => {
            req.body.author = {
                _id: user.id
            }
            const newblog = new blog(req.body);
            return newblog.save()
        })
        .then(blog => {
            res.status(201).json(blog);
        })
        .catch(err => {
            console.log("Err", err);
            res.status(404).send('really tho');
        });

});

router.get('/:id', (req, res) => {
    blog.findById(req.params.id)
        .then(blog => {
            if (!blog) {
                res.status(404).send(null);
                return;
            }
            res.status(200).json(blog);
        })
        .catch(err => {
            console.log("Err", err);
            res.status(404).send(null);
        });

});

router.put('/:id', (req, res) => {
    blog.findByIdAndUpdate(
            req.params.id, {
                $set: req.body
            })
        .then(blog => {
            res.status(204).send(req.body);
        })
        .catch(err => {
            console.log("Err", err);
            res.status(404).send(null);
        });

});

router.delete('/:id', (req, res) => {
    blog.findByIdAndRemove(req.params.id)
        .then(blog => {
            res.send(req.params.id);
        })
        .catch(err => {
            console.log("Err", err);
            res.status(404).send(null);
        });

});

module.exports = router;
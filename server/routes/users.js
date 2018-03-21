const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        });
        
});


router.get('/:id', (req, res) => {
    User
        .findById(req.params.id)
        .then(user => {
            if (!user) res.status(404).send(null);
            res.status(200).json(user);
            console.log(user);
        });
        
});

router.post('/', (req, res) => {
    const user = new User(req.body);
    user
        .save()
        .then(user => {
            res.status(201).json(user);
        });
        
});


router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id,
        { $set: req.body },
        { new: true })
        .then(user => {
            res.status(204).send(req.body);
        });
        
});

router
    .delete('/:id', (req, res) => {
        User.findByIdAndRemove(req.params.id)
            .then(user => {
                res.send(req.params.id);
            });
            
    });

module.exports = router;
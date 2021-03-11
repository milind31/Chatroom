const router = require('express').Router();
const chatMessage = require('../models/chat.model');


router.route('/').get((req, res) => {
    chatMessage.find()
        .then(msg => res.json(msg))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const user_from = req.body.user_from;
    const user_to = req.body.user_to;
    const message = req.body.message;

    const newChat = new chatMessage({
        user_from,
        user_to,
        message,
    });

    newChat.save()
        .then(() => res.json('Item added!')) 
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    chatMessage.findById(req.params.id)
        .then(msg => res.json(msg))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/userfrom/:userfrom').get((req, res) => {
    chatMessage.find({user_from: req.params.userfrom})
        .then(msg => res.json(msg))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/userto/:userto').get((req, res) => {
    chatMessage.find({user_to: req.params.userto})
        .then(msg => res.json(msg))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    chatMessage.findByIdAndDelete(req.params.id)
        .then(() => res.json('Item deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) =>{
    chatMessage.findById(req.params.id)
        .then(msg => {
            msg.user_from = req.body.user_from;
            msg.user_to = req.body.user_to;
            msg.message = req.body.message;

            msg.save()
                .then(() => res.json('Item updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
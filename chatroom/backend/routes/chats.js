const router = require('express').Router();
const chatMessage = require('../models/chat.model');


router.route('/').get((req, res) => {
    chatMessage.find()
        .then(msg => res.json(msg))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const user_from = req.body.user_from;
    const user_from_id = req.body.user_from_id;
    const user_to = req.body.user_to;
    const user_to_id = req.body.user_to_id;
    const message = req.body.message;

    const newChat = new chatMessage({
        user_from,
        user_from_id,
        user_to,
        user_to_id,
        message
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

//get messages sent to one user
router.route('/userto/:userto').get((req, res) => { 
    chatMessage.find({user_to: req.params.userto})
        .then(msg => res.json(msg))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get messages between two users
router.route('/:userto/:userfrom').get((req, res) => { 
    chatMessage.find({user_to: req.params.userto, user_from: req.params.userfrom})
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
            msg.user_from_id = req.body.user_from_id;
            msg.user_to = req.body.user_to;
            msg.user_to_id = req.body.user_to_id,
            msg.message = req.body.message;

            msg.save()
                .then(() => res.json('Item updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
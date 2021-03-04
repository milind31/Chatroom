const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const occupation = req.body.occupation;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    const favorite_music_genre = req.body.favorite_music_genre;
    const likes_sports = req.body.likes_sports;
    const likes_to_travel = req.body.likes_to_travel;

    const newUser = new User({
        username,
        occupation,
        city,
        state,
        country,
        favorite_music_genre,
        likes_sports,
        likes_to_travel
    });

    newUser.save()
        .then(() => res.json('User added!')) 
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('Item deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) =>{
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;
            user.occupation = req.body.occupation;
            user.city = req.body.city;
            user.state = req.body.state;
            user.country = req.body.country;
            user.favorite_music_genre = req.body.favorite_music_genre;
            user.likes_sports = req.body.likes_sports;
            user.likes_to_travel = req.body.likes_to_travel;

            user.save()
                .then(() => res.json('Item updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;
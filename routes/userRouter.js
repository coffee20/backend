const router = require('express').Router();
const User = require('../models/user');

// GET SINGLE USER
router.get('/:user_id', function(req, res){
    User.findOne({_id: req.params.user_id}, (err, user) => {
        if (err) return res.status(500).json({error: err});
        if (!user) return res.status(404).json({error: "User is not exist"});
        res.status(200).json(user);
    })
});

// CREATE USER
router.post('/', function(req, res){
    let user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.birthYear = req.body.birthYear;
    user.birthMonth = req.body.birthMonth;
    user.gender = req.body.gender;

    user.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1, message: "Save success!"});
    });
});

// UPDATE THE USER
router.put('/:user_id', function(req, res){
    User.findById(req.params.user_id, (err, user) => {
        if (err) return res.status(500).json({error: err});
        if (!user) return res.status(404).json({error: "User is not exist"});


    })
});

// DELETE USER
router.delete('/:user_id', function(req, res){
    res.end();
});

module.exports = router;
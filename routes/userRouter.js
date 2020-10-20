/*
 * 항목 내용이 res.send()인 경우 작업중인 route임.
***/

const router = require('express').Router();
const User = require('../models/user');

// GET SINGLE USER
router.get('/getUserByEmail/:user_email', function(req, res){
    User.findOne({email: req.params.user_email}, (err, user) => {
        if (err) return res.status(500).json({error: err});
        if (!user) return res.status(404).json({error: "User is not exist"});
        res.status(200).json(user);
    })
});

// GET SINGLE USER
router.get('/getUserIdByEmail/:user_email', function(req, res){
    User.findOne({email: req.params.user_email}, (err, user) => {
        if (err) return res.status(500).json({error: err});
        if (!user) return res.status(404).json({error: "User is not exist"});
        res.status(200).json({_id: user._id});
    })
});

// CREATE USER
router.post('/signup', function(req, res){
    let user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.birthYear = req.body.birthYear;
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

// UPDATE THE USER 수정해야 함.
router.put('/updateUserByEmail/:email', function(req, res){
    User.findOne({email:req.params.email}, (err, user) => {
        if (err) return res.status(500).json({error: err});
        if (!user) return res.status(404).json({error: "User is not exist"});

        user.password = req.body.password;
        user.birthYear = req.body.birthYear;
        user.gender = req.body.gender;
        
        user.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }

            res.json({result: 1, message: "Save success!"});
        });
    })
});

// DELETE USER
router.delete('/deleteUserByEmail/:user_email', function(req, res){
    User.remove({email: user_email}, (err) => {
        if(err) throw err;
        res.json({result: 1, message: "remove success!"});
    });
});

// User Star point insert
router.put('/userStarInsert/:user_id/:coffee_id/:point', (req, res) => {
    User.findByIdAndUpdate(req.params.user_id, 
        { "$push" : {"stars": {
            "coffeeId" : req.params.coffee_id,
            "point" : req.params.point
        }}},
        {"new": true, "upsert": true},
        (err, star) => {
            if(err) throw err;
            res.json({result: 1, message: "star point success! : User"});
        }
    );
})

// Star point delete
router.put('/userStarDelete/:user_id/:coffee_id', (req, res) => {
    User.findByIdAndUpdate(req.params.user_id,
        { "$pull": {"stars": {"coffeeId": req.params.coffee_id}}},
        (err, star) => {
            if(err) throw err;
            res.json({result: 1, message: "star point deleted! : User"});
        }
    );
})

// User like insert
router.put('/userLikeInsert/:user_id/:coffee_id', (req, res) => {
    User.findByIdAndUpdate(req.params.user_id, 
        { "$push" : {"likes": {
            "coffeeId" : req.params.coffee_id
        }}},
        {"new": true, "upsert": true},
        (err, like) => {
            if(err) throw err;
            res.json({result: 1, message: "like success! : User"});
        }
    );
})

// like delete
router.put('/userLikeDelete/:user_id/:coffee_id', (req, res) => {
    User.findByIdAndUpdate(req.params.user_id,
        { "$pull": {"likes": {"coffeeId": req.params.coffee_id}}},
        (err, likes) => {
            if(err) throw err;
            res.json({result: 1, message: "like deleted! : User"});
        }
    );
})

module.exports = router;
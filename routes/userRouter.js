/*
 * 항목 내용이 res.send()인 경우 작업중인 route임.
***/

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
router.put('/:email', function(req, res){
    User.findById({email:req.params.email}, (err, user) => {
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
router.delete('/:email', function(req, res){
    res.end();
});

// User Star point
router.put('/:email/star/:coffee_id', (req, res) => {
    res.end();
})

module.exports = router;
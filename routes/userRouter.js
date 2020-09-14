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

// CREATE USER
router.post('/signup/', function(req, res){
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

// User Star point
router.put('/starPoint/:user_email/:coffee_id', (req, res) => {
    User.findOne({email: user_email}, (err, user) => {
        if (err) return res.status(500).json({error: err});
        if (!user) return res.status(404).json({error: "User is not exist"});


    })
})

module.exports = router;
const router = require('express').Router();
const User = require('../models/user');
const Test = require('../models/test');

router.get('/', (req, res) => {
    res.send('This is api route.');
})

// GET SINGLE USER
router.get('/users/:user_id', function(req, res){
    res.end();
});

// CREATE USER
router.post('/users', function(req, res){
    let user = new User();
    user.email = req.body.email;
    user.birthYear = req.body.birthYear;
    user.birthMonth = req.body.birthMonth;
    user.gender = req.body.gender;

    user.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1});
    });
});

// CREATE USER
router.post('/tests', function(req, res){
    let test = new Test();
    test.name = req.body.name;
    test.num = req.body.num;
    
    test.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1});
    });
});

// UPDATE THE USER
router.put('/users/:user_id', function(req, res){
    res.end();
});

// DELETE USER
router.delete('/users/:user_id', function(req, res){
    res.end();
});

module.exports = router;
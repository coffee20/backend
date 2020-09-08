const router = require('express').Router();

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

// UPDATE THE USER
router.put('/users/:user_id', function(req, res){
    res.end();
});

// DELETE USER
router.delete('/users/:user_id', function(req, res){
    res.end();
});

module.exports = router;
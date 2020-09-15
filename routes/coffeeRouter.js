const router = require('express').Router();
const Coffee = require('../models/coffee');

// CREATE COFFEE
router.post('/coffeeInsert/', function(req, res){
    let coffee = new Coffee();
    coffee.coffeeName = req.body.coffeeName;
    coffee.cafeId = req.body.cafeId;

    coffee.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1, message: "Save success!"});
    });
});

module.exports = router;
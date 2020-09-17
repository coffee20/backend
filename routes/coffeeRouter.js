const router = require('express').Router();
const Coffee = require('../models/coffee');

// CREATE COFFEE
router.post('/coffeeInsert', function(req, res){
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

// Coffee Star point insert
router.put('coffeeStarInsert/:user_id/:coffee_id/:point', (req, res) => {
	Coffee.findByIdAndUpdate(req.params.coffee_id,
		{ "$push" : {"points": {
			"user_id" : req.params.user_id,
			"point" : req.params.point
		} } } ,
		{"new" : true, "upsert": true},
		(err, coffee) => {
			if(err) throw err;
			res.json({result: 1, message: "star point success! : coffee"});
		} 
	);
} )

// Coffee Star Point delete
router.put('/CoffeestarDelete/:user_id/:coffee_id', (req, res) => {
	Coffee.findByIdAndUpdate(req.params.user_id,
		{ "$pull" : {"points" : {"user_id" : req.params.user_id} } },
		(err, star) => {
			if(err) throw err;
			res.json({result: 1, message: "star point deleted! : coffee"})
		} 
	)
} )
module.exports = router;

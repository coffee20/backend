const router = require('express').Router();
const Coffee = require('../models/coffee');

// CREATE COFFEE
router.post('/coffeeInsert', function (req, res) {
	let coffee = new Coffee();
	coffee.coffeeName = req.body.coffeeName;
	coffee.cafeName = req.body.cafeName;
	coffee.imgUri = req.body.imgUri;

	coffee.save(function (err) {
		if (err) {
			console.error(err);
			res.json({ result: 0 });
			return;
		}

		res.json({ result: 1, message: "Save success!" });
	});
});

router.post('/coffeeManyInsert', async (req, res) => {
	let payload = req.body;

	await Coffee.insertMany(payload);
	console.log(JSON.stringify(insertMany, '', '\t'));
	res.status(200).send(1);

});

router.get('/getCoffeeByCafe/:Cafe_name', (req, res) => {
	Coffee.find({ cafeName: req.params.Cafe_name }, (err, coffee) => {
		if (err) return res.status(500).json({ error: err });
		if (!coffee) return res.status(404).json({ error: "Coffee is not exist" });
		res.status(200).json(coffee);
	})
})

router.get('/getCoffee/:Cafe_name/:Coffee_name', (req, res) => {
	Coffee.findOne({ coffeeName: req.params.Coffee_name, cafeName: req.params.Cafe_name }, (err, coffee) => {
		if (err) return res.status(500).json({ error: err });
		if (!coffee) return res.status(404).json({ error: "Coffee is not exist" });
		res.status(200).json(coffee);
	})
})

router.get('/getCoffeeById/:coffee_id', (req, res) => {
	Coffee.findById(req.params.coffee_id, (err, coffee) => {
		if (err) return res.status(500).json({ error: err });
		if (!coffee) return res.status(404).json({ error: "Coffee is not exist" });
		res.status(200).json(coffee);
	})
})

// Get Coffee ID by Cafe name and coffee name
// 카페이름, 커피이름으로 커피 id 찾기
router.get('/getCoffeeId/:Cafe_name/:Coffee_name', (req, res) => {
	Coffee.findOne({ coffeeName: req.params.Coffee_name, cafeName: req.params.Cafe_name }, (err, coffee) => {
		if (err) return res.status(500).json({ error: err });
		if (!coffee) return res.status(404).json({ error: "Coffee is not exist" });
		res.status(200).json({ _id: coffee._id });
	})
})

// Get coffee's star point average
router.get('/getCoffeePointAvg/:coffee_id', (req, res) => {
	Coffee.findById(req.params.coffee_id, (err, coffee) => {
		if (err) throw err;
		if (!coffee) return res.status(404).json({ error: "Coffee is not exist" });

		let coffeePoints = coffee.toObject().points;
		let avg, sum = 0;
		for (let i = 0; i < coffeePoints.length; i++) {
			sum += coffeePoints[i].point;
		}
		avg = (sum / coffeePoints.length).toFixed(2);
		res.status(200).json({ "avg": avg });
	})
})

router.get('/getPointTopCoffees', (req, res) => {
	Coffee.find((err, coffee) => {
		let arr = [];
		if (err) return res.status(500).json({ error: err });
		if (!coffee) return res.status(404).json({ error: "Coffee is not exist" });
		for(let i = 0; i < coffee.length; i++){
			let avg, sum = 0;
			if(coffee[i].points.length === 0) continue;
			for(let j = 0; j < coffee[i].points.length; j++){
				sum += coffee[i].points[j].point;
			}
			avg = (sum / coffee[i].points.length).toFixed(2);
			arr.push([coffee[i]._id, avg]);
		}
		arr.sort((a, b) => {
			return b[1] - a[1];
		})
		res.status(200).json(arr);
	})
})

// Coffee Star point insert
router.put('/coffeeStarInsert/:coffee_id/:user_id/:point', (req, res) => {
	Coffee.findByIdAndUpdate(req.params.coffee_id,
		{
			"$push": {
				"points": {
					"userId": req.params.user_id,
					"point": req.params.point
				}
			}
		},
		{ "new": true, "upsert": true },
		(err, coffee) => {
			if (err) throw err;
			if (!coffee) return res.status(404).json({ error: "Coffee is not exist" });
			res.json({ result: 1, message: "star point success! : coffee" });
		}
	);
})

// Coffee Star Point delete
router.put('/coffeeStarDelete/:coffee_id/:user_id', (req, res) => {
	Coffee.findByIdAndUpdate(req.params.coffee_id,
		{ "$pull": { "points": { "userId": req.params.user_id } } },
		(err, star) => {
			if (err) throw err;
			if (!star) return res.status(404).json({ error: "star is not exist" });
			res.json({ result: 1, message: "star point deleted! : coffee" })
		}
	)
})

module.exports = router;

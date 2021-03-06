const router = require('express').Router();
const Cafe = require('../models/cafe');


// Cafe Data Insert
router.post('/insertCafeName', (req, res) => {
    let cafe = new Cafe();
    cafe.cafeName = req.body.cafeName;

    cafe.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1, message: "Save success!"});
    });
});

// Get All Cafes
router.get('/getAllCafes', (req, res) => {
    Cafe.find({}, (err, cafe) => {
        if (err) return res.status(500).json({error: err});
        if (!cafe) return res.status(404).json({error: "There is no cafe"});
		res.status(200).json(cafe);
    })
})

// 무쓸모임
router.get('/getCafeIdFromName/:cafeName', (req, res) => {
    Cafe.findOne({cafeName: req.params.cafeName}, (err, cafe) => {
        if (err) return res.status(500).json({error: err});
        if (!cafe) return res.status(404).json({error: "Cafe is not exist"});
        res.status(200).json({cafe_id: cafe._id});
    })
})


module.exports = router;
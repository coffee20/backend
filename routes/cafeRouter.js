const router = require('express').Router();
const Cafe = require('../models/cafe');

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

router.get('/getCafeIdFromName/:cafeName', (req, res) => {
    Cafe.findOne({cafeName: req.params.cafeName}, (err, cafe) => {
        if (err) return res.status(500).json({error: err});
        if (!cafe) return res.status(404).json({error: "Cafe is not exist"});
        res.status(200).json({cafe_id: cafe._id});
    })
})


module.exports = router;
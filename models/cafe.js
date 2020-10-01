const mongoose = require('mongoose');

const cafeSchema = new mongoose.Schema({
    cafeName : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    points: [
        {userId: {type: String, require: true, unique: true}, 
         point: {type: Number, require: true}}
    ],
},{
    versionKey: false
});

module.exports = mongoose.model("cafe", cafeSchema, 'cafes');
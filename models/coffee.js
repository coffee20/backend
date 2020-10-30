const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coffeeSchema = new Schema({
    coffeeName: {
        type: String,
        require: true
    },
    cafeName: {
        type: String,
        require: true
    },
    imgUri: {
        type: String,
        require: true
    },
    points: [
        {userId: {type: String, require: true, unique: true}, 
         point: {type: Number, require: true}}
    ],
    tags: [
        {tag: {type: String, unique: true}}
    ]
},{
    versionKey: false
});

module.exports = mongoose.model("coffee", coffeeSchema);
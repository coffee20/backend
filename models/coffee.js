const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coffeeSchema = new Schema({
    coffeeName: {
        type: String,
        require: true;
    },
    cafeId: {
        type: String,
        require: true
    },
    points: [
        {user_id: String, point: Number}
    ]
},{
    versionKey: false
});

module.exports = mongoose.model("coffee", coffeeSchema);
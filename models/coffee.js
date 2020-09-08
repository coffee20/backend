const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coffeeSchema = new Schema(
    {
        id: String,
        coffeeShop: String,
        coffeeName: String,
        price: Number,
        start: array
    },
    {
        versionKey: "_somethingElse"
    }
);

module.exports = mongoose.model("coffee", coffeeSchema);
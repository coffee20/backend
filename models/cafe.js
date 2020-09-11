const mongoose = require('mongoose');

const cafeSchema = new mongoose.Schema({
    cafeName : {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

module.exports = mongoose.model("cafe", cafeSchema, 'cafes');
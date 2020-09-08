const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String, 
            required: true, 
            unique: true, 
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            trim: true
        },
        birthYear: {
            type: Number, 
            required: true
        },
        birthMonth: {
            type: Number, 
            required: true
        },
        gender: {
            type: String, 
            required: true, 
            trim: true
        },
        stars: [
            {coffeeId: {type: String, required: true}, point:{type: Number, required: true, unique: true}}
        ],
        likes: [
            {coffeeId: {type: String, required: true, unique: true}}
        ]
    }
);

module.exports = mongoose.model("user", userSchema);
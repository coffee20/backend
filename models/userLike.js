const mongoose = require('mongoose');

const userLikeSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true},
    }
)
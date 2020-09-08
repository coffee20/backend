const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema(
    {
        name: {type: String, require: true},
        num: {type: Number}
    }
);

module.exports = mongoose.model('test', testSchema);
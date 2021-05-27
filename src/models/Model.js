const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const schema = new Schema({
    value: {
        type: Boolean,
        default: false
    }
})

let model = mongoose.model('schema', schema);

module.exports = model;
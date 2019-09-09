const mongoose = require('mongoose');
const currentDate = require('../utils/date');

const Schema = mongoose.Schema;

const model = new Schema({
    name: {type: String },
    admin: {type:String},
    content: {type: String},
    dateTime: {type: Date, default: currentDate}
})

const mongooseModel = mongoose.model("post", model);

module.exports = mongooseModel;
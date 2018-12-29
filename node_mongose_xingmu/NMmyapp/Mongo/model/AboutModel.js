const mongoose = require('mongoose');
const Schema = require('../schema/Schema');

let schema = new Schema('aboutSchema');
module.exports = mongoose.model('about', schema);
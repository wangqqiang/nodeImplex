const mongoose = require('mongoose');
const Schema = require('../schema/Schema');

let schema = new Schema('accountSchema');
module.exports = mongoose.model('account', schema);
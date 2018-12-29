const mongoose = require('mongoose');
const Schema = require('../schema/Schema');

let schema = new Schema('serviceSchema');
module.exports = mongoose.model('service', schema);
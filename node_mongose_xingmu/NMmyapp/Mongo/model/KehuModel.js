const mongoose = require('mongoose');
const Schema = require('../schema/Schema');

let schema = new Schema('kehuSchema');
module.exports = mongoose.model('kehu', schema);
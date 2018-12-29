var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = {
  _id: {
    type: Schema.Types.ObjectId
  },
  cname: {
    type: String,
    required: true,
    unique: true
  },
  imageUrl: {
    type: String,
    validate: {
      validator: function (v) {
        return /^.+(.jpg|.png|.jpeg)$/.test(v);
      },
    },
  },
  brief: {
    type: String
  }
}
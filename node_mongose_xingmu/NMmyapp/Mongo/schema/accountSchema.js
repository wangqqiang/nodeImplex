module.exports = {
  _id: {
    type: 'ObjectId'
  },
  user: {
    type: String,
    required: true,
    unique: true
  },
  pwd: {
    type: String,
    minlength: 4,
    maxlength: 12,
    required: true
  }
}
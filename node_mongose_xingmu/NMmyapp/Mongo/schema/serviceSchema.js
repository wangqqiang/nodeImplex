module.exports = {
  _id: {
    type: 'ObjectId',
  },
  titme: {
    type: String,
    required: true,
    unique: true
  },
  comment: {
    type: String,
  },
  imageUrl: {
    type: String,
    validate: {
      validator: function (v) {
        return /^.+(.jpg|.png|.jpeg)$/.test(v);
      },
    },
    required: true
  },
}
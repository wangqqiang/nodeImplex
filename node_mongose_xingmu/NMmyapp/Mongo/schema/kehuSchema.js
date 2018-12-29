module.exports = {
  _id: {
    type: 'ObjectId',
  },
  company: {
    type: String,
  },
  description: {
    type: String,
  },
  website: {
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
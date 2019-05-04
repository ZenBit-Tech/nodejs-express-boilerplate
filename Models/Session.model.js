const mongoose = require('mongoose')
const { Schema } = mongoose

const SessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Session', SessionSchema)

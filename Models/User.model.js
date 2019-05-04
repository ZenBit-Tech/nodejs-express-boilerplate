const mongoose = require('mongoose')
const _ = require('lodash')
const passwordLib = require('../Libs/password.lib')

const hiddenUserFields = ['password']

const { Schema } = mongoose

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      default: ''
    },
    registrationType: {
      type: String,
      required: true,
      default: 'local'
    },
    socialId: {
      // for OAuth registration
      type: String,
      default: ''
    }
  },
  { timestamps: true }
)

UserSchema.pre('save', async function(next) {
  const user = this
  if (user.isModified('password')) {
    await passwordLib
      .encryptPassword(user.password)
      .then(hash => {
        user.password = hash
      })
      .catch(err => next(err))
  }

  return next()
})

class PersonalClass {
  comparePassword(password) {
    return passwordLib.comparePasswords(password, this.password)
  }

  omitFields() {
    return _.omit(this, hiddenUserFields)
  }
}

UserSchema.loadClass(PersonalClass)

module.exports = mongoose.model('User', UserSchema)

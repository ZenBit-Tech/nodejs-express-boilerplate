const User = require('../Models/User.model')

class UserManager {
  async findByEmail(email) {
    try {
      const user = await User.findOne({ email })

      return user || null
    } catch (err) {
      throw err
    }
  }

  async createUser(newUserData) {
    try {
      const newUser = new User(newUserData)

      const validation = newUser.validateSync()
      if (validation && validation.errors) {
        return { error: validation.errors }
      }

      await newUser.save()

      return newUser
    } catch (err) {
      throw Error(err)
    }
  }

  async updateUser(userId, update, returnNew = true) {
    try {
      const nextUser = User.findByIdAndUpdate(userId, update, {
        new: returnNew,
      })

      return nextUser
    } catch (err) {
      throw Error(err)
    }
  }

  async deleteUser(userId) {
    try {
      await User.findByIdAndRemove(userId)
    } catch (err) {
      throw Error(err)
    }
  }

  async findOne(params) {
    try {
      return await User.findOne(params)
    } catch (err) {
      throw Error(err)
    }
  }

  async findById(id) {
    try {
      return await User.findById(id)
    } catch (err) {
      throw Error(err)
    }
  }
}

module.exports = new UserManager()
module.exports.UserManager = UserManager

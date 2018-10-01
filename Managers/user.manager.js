const { User } = require('../DB').default

class UserManager {
  static async findByEmail(email) {
    try {
      const user = await User.findOne({ email })

      return user || null
    } catch (err) {
      throw err
    }
  }

  static async createUser(newUserData) {
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

  static async updateUser(userId, update, returnNew = true) {
    try {
      const nextUser = User.findByIdAndUpdate(userId, update, {
        new: returnNew,
      })

      return nextUser
    } catch (err) {
      throw Error(err)
    }
  }

  static async deleteUser(userId) {
    try {
      await User.findByIdAndRemove(userId)
    } catch (err) {
      throw Error(err)
    }
  }

  static async findOne(params) {
    try {
      return await User.findOne(params)
    } catch (err) {
      throw Error(err)
    }
  }

  static async findById(id) {
    try {
      return await User.findById(id)
    } catch (err) {
      throw Error(err)
    }
  }
}

module.exports = UserManager

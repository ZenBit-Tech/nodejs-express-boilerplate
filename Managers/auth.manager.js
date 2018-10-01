const bcrypt = require('bcrypt')

const { SALT_WORK_FACTOR } = process.env

const encryptPassword = password =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return reject(err)

      // hash the password using our new salt
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) return reject(err)

        // override the cleartext password with the hashed one
        resolve(hash)
      })
    })
  })

module.exports = {
  encryptPassword
}

const bcrypt = require('bcrypt')

const { SALT_WORK_FACTOR } = process.env

const encryptPassword = password => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(parseInt(SALT_WORK_FACTOR, 10), function(err, salt) {
      if (err) return reject(err)

      // hash the password using our new salt
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) return reject(err)

        // override the cleartext password with the hashed one
        resolve(hash)
      })
    })
  })
}

const comparePasswords = (rawPassword, hashPassword) => {
  return bcrypt.compareSync(rawPassword, hashPassword)
}

module.exports = {
  encryptPassword,
  comparePasswords
}

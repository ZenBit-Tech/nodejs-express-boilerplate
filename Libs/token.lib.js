const JWT = require('jsonwebtoken')
const tokenConfg = require('../Config/token.config')
const moment = require('moment')

// const CandidatesManager = require('../DB/candidatesManager')

async function getUsersToken(user) {
  if (
    !user.token ||
    !user.tokenExpired ||
    moment().isAfter(user.tokenExpired)
  ) {
    const { token, expired } = getToken(user)

    // update user
    // await CandidatesManager.updateUserToken(user.id, token, expired)

    return token
  } else {
    return user.token
  }
}

function getToken(user) {
  const token = JWT.sign(user, tokenConfg.secret)

  const expired = moment()
    .add(tokenConfg.expired)
    .format('YYYY-MM-DD')

  return {
    token,
    expired
  }
}

module.exports.getUsersToken = getUsersToken
module.exports.getToken = getToken

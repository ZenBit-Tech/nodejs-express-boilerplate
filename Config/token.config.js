const { TOKEN_SECRET } = process.env

module.exports = {
  secret: TOKEN_SECRET,
  expired: {
    // you can also use
    // days
    // milliseconds
    year: 1
  }
}

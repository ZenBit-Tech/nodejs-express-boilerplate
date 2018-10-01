const endMiddleware = (request, response, next) => {
  logger.logEnd();
};

module.exports = endMiddleware;
